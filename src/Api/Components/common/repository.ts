

export class Repository {

  public static async findMany<WhereInput, Delegate, Select, Include>(
    { Model, where, select, include, search, page = '1', limit = '10', fullTextSearch }: {
      Model: Delegate,
      where: WhereInput,
      select?: Select,
      include?: Include,
      search: string | undefined,
      page: string,
      limit: string,
      fullTextSearch: string[]
    }
  ) {

    if (search) {
      where = {
        ...where,
        OR: fullTextSearch.map((key) => {
          return { [key]: { contains: search , mode:"insensitive" } }
        })
      }
    }

    console.log(JSON.stringify(where, null, 2));

    // pagination
    const crPage = parseInt(page, 10) || 1;
    const crLimit = parseInt(limit, 10) || 10;
    const startIndex = (crPage - 1) * crLimit;
    const endIndex = crPage * crLimit;
    // @ts-ignore
    const total = await Model.count({ where });
    const pages = Math.ceil(total / crLimit)

    const pagination: any = {};
    pagination.total = total
    pagination.pages = pages

    if (endIndex < total) {
      pagination.next = {
        page: crPage + 1,
        limit: crLimit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: crPage - 1,
        limit: crLimit,
      };
    }

    // @ts-ignore
    const entities = await Model.findMany({
      where,
      include,
      select,
      skip: crLimit * (crPage - 1),
      take: crLimit
    })
    return { entities, pagination }
  }

}
