import reward, { rewardModel } from "./rewards";
const { createGiftCard } = require('amazon-gc');

export default class rewardsRepo {
  public static get(): Promise<reward[]> {
    return rewardModel
      .find({ isDeleted: false })
      .exec();
  }

  public static async add(body: reward): Promise<{ reward: reward }> {
    const reward = await rewardModel.create({ ...body } as reward);
    return { reward };
  }
}