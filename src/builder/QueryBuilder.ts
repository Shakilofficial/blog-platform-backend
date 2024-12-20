import { FilterQuery, Query } from 'mongoose';

// Class to build query based on searchable fields, filter, pagination, sorting and fields
class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  // Constructor to initialize the class with model query and query object
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  // Apllies search query based on searchable fields 

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    // Check if search query is present
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  // Applies filter query parameters,exlcuding reserved fields 

  filter() {
    // Copy query object by spreading
    const queryObj = { ...this.query };
    // List of reserved fields
    const reservedFields = [
      'search',
      'page',
      'limit',
      'sortBy',
      'sortOrder',
      'fields',
      'filter',
    ];
    //Deletes a specified field from the query object.
    reservedFields.forEach((field) => delete queryObj[field]);
    // Check if filter query is present
    const filterValue = this.query?.filter as string | undefined;
    if (filterValue) {
      this.modelQuery = this.modelQuery.find({
        author: filterValue,
      });
    }
    // Check if query object is not empty
    if (Object.keys(queryObj).length > 0) {
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    }

    return this;
  }

  // Paginates the query based on page and limit
  paginate() {
    // Get page and limit from query object
    const page = Math.max(Number(this.query?.page) || 1, 1);
    const limit = Math.max(Number(this.query?.limit) || 10, 1);
    const skip = (page - 1) * limit;
    // Paginate the query
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // Sorts the query based on sortBy and sortOrder
  sort() {
    // Get sortBy and sortOrder from query object
    const sortBy = this.query?.sortBy as string | undefined;
    const sortOrder = this.query?.sortOrder as string | undefined;
    // Check if sortBy and sortOrder are present
    if (sortBy) {
      // Concatenate sortBy and sortOrder
      const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
      this.modelQuery = this.modelQuery.sort(sortStr);
    }
    return this;
  }

  // Applies fields query parameter 
  fields() {
    // Get fields from query object and split it by comma
    const fields = (this.query?.fields as string)?.split(',').join(' ') || '';
    const defaultFields = '-__v'; // Exclude version by default

    this.modelQuery = this.modelQuery.select(fields || defaultFields);
    return this;
  }
}

export default QueryBuilder;
