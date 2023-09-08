"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const video_1 = require("./video");
class VideoRepo {
    // public static findById(id: Category['id']) {
    static findById(id) {
        // console.log("whwrw",where)
        return video_1.VideoModel.findUnique({ where: {
                id
            },
            include: {
                media: true
            }
        });
    }
}
exports.default = VideoRepo;
//# sourceMappingURL=video.repository.js.map