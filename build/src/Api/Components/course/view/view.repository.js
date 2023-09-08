"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewRepository = void 0;
const view_1 = require("./view");
const repository_1 = require("../../../../core/common/repository");
class ViewRepository extends repository_1.BaseRepository {
    constructor() {
        super({ model: view_1.ViewModel });
    }
}
exports.ViewRepository = ViewRepository;
//# sourceMappingURL=view.repository.js.map