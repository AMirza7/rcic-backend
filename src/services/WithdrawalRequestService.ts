import { WithdrawalRequest, WithdrawalRequestAttributes } from '../models/WithdrawalRequest';

export class WithdrawalRequestService {
  static async create(data: Partial<WithdrawalRequestAttributes>) {
    return WithdrawalRequest.create(data as any);
  }

  static async getById(id: string) {
    return WithdrawalRequest.findByPk(id);
  }

  static async list(filter: {
    userId?: string;
    status?: WithdrawalRequestAttributes['status'];
  } = {}) {
    return WithdrawalRequest.findAll({ where: filter });
  }

  static async update(
    id: string,
    updates: Partial<WithdrawalRequestAttributes>
  ) {
    const [count, [updated]] = await WithdrawalRequest.update(updates, {
      where: { id },
      returning: true
    });
    return { count, updated };
  }

  static async delete(id: string) {
    return WithdrawalRequest.destroy({ where: { id } });
  }
}
