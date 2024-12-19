import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  // Apllies search query based on searchable fields

  search(searchableFields: string[]) {
    const search = this?.query?.search;
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
    const queryObj = { ...this.query };
    const reservedFields = [
      'search',
      'page',
      'limit',
      'sortBy',
      'sortOrder',
      'fields',
      'filter',
    ];
    reservedFields.forEach((field) => delete queryObj[field]);

    const filterValue = this.query?.filter as string | undefined;
    if (filterValue) {
      this.modelQuery = this.modelQuery.find({
        author: filterValue,
      });
    }

    if (Object.keys(queryObj).length > 0) {
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    }

    return this;
  }

  // Paginates the query based on page and limit
  paginate() {
    const page = Math.max(Number(this.query?.page) || 1, 1);
    const limit = Math.max(Number(this.query?.limit) || 10, 1);
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // Sorts the query based on sortBy and sortOrder
  sort() {
    const sortBy = this.query?.sortBy as string | undefined;
    const sortOrder = this.query?.sortOrder as string | undefined;

    if (sortBy) {
      const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
      this.modelQuery = this.modelQuery.sort(sortStr);
    }
    return this;
  }

  // Applies fields query parameter
  fields() {
    const fields = (this.query?.fields as string)?.split(',').join(' ') || '';
    const defaultFields = '-__v'; // Exclude version by default

    this.modelQuery = this.modelQuery.select(fields || defaultFields);
    return this;
  }
}

export default QueryBuilder;
