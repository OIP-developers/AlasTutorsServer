
export abstract class BaseRepository<ModelType> {

  protected Model: ModelType | null = null;

  constructor({ model }: { model: ModelType }) {
    this.Model = model;
  }

  protected async execute<R>(operation: () => Promise<R | null>): Promise<R | null> {
    try {
      if (this.Model) {
        return await operation();
      }
      throw new Error("Model not initialized");
    } catch (error) {
      console.error("Repository operation failed:", error);
      return null;
    }
  }

  public async findMany<WhereInput, Include>({ where, include }: {
    where: WhereInput,
    include: Include
  }) {
    return this.execute(() =>
      (this.Model as any).findMany({
        where,
        include,
      })
    );
  }

  public findOne<WhereInput, Include>({ where, include }: { where: WhereInput, include: Include }) {
    return this.execute(() =>
      (this.Model as any).findFirst({
        where,
        include,
      })
    )
  }

  public findUnique<WhereUniqueInput, Include>({ where, include }: { where: WhereUniqueInput, include: Include }) {
    return this.execute(() =>
      (this.Model as any).findUnique({
        where,
        include,
      })
    )
  }

  public create<CreateInput, Include>({ data, include }: { data: CreateInput, include: Include }) {
    return this.execute(() =>
      (this.Model as any).create({
        data,
        include,
      })
    )
  }

  public createMany<CreateManyInput>({ data }: { data: CreateManyInput }) {
    return this.execute(() =>
      (this.Model as any).createMany({
        data,
        skipDuplicates: true
      })
    )
  }

  public update<WhereUniqueInput, CreateManyInput, Include>({ where, data, include }: { where: WhereUniqueInput, data: CreateManyInput, include: Include }) {
    return this.execute(() =>
      (this.Model as any).update({
        where,
        data,
        include
      })
    )
  }

  public updateMany<WhereInput, CreateManyInput>({ where, data }: { where: WhereInput, data: CreateManyInput }) {
    return this.execute(() =>
      (this.Model as any).updateMany({
        where,
        data,
      })
    )
  }

  public delete<WhereUniqueInput, Include>({ where, include }: { where: WhereUniqueInput, include: Include }) {
    return this.execute(() =>
      (this.Model as any).delete({
        where,
        include
      })
    )
  }

  public deleteMany<WhereInput>({ where }: { where: WhereInput }) {
    return this.execute(() =>
      (this.Model as any).deleteMany({
        where,
      })
    )
  }

}
