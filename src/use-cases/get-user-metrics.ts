import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCase {
  userId: string
}
interface GetUseMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUseMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCase): Promise<GetUseMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
