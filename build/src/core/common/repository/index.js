"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor({ model }) {
        this.Model = null;
        this.Model = model;
    }
    execute(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.Model) {
                    return yield operation();
                }
                throw new Error("Model not initialized");
            }
            catch (error) {
                console.log(error);
                throw error;
                return null;
            }
        });
    }
    findMany({ where, include }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.execute(() => this.Model.findMany({
                where,
                include,
            }));
        });
    }
    findOne({ where, include }) {
        return this.execute(() => this.Model.findFirst({
            where,
            include,
        }));
    }
    findOneOrThrow({ where, include }) {
        return this.execute(() => this.Model.findFirstOrThrow({
            where,
            include,
        }));
    }
    findUnique({ where, include }) {
        return this.execute(() => this.Model.findUnique({
            where,
            include,
        }));
    }
    create({ data, include }) {
        return this.execute(() => this.Model.create({
            data,
            include,
        }));
    }
    createMany({ data }) {
        return this.execute(() => this.Model.createMany({
            data,
            skipDuplicates: true
        }));
    }
    update({ where, data, include }) {
        return this.execute(() => this.Model.update({
            where,
            data,
            include
        }));
    }
    upsert({ create, update, where }) {
        return this.execute(() => this.Model.upsert({
            create,
            update,
            where,
        }));
    }
    updateMany({ where, data }) {
        return this.execute(() => this.Model.updateMany({
            where,
            data,
        }));
    }
    delete({ where, include }) {
        return this.execute(() => this.Model.delete({
            where,
            include
        }));
    }
    deleteMany({ where }) {
        return this.execute(() => this.Model.deleteMany({
            where,
        }));
    }
    count({ where }) {
        return this.execute(() => this.Model.count({
            where,
        }));
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=index.js.map