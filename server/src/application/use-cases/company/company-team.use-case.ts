import { injectable, inject } from 'inversify';
import { ICompanyTeamRepository } from '../../../domain/repositories/company-team.repository';
import { CompanyTeam } from '../../../domain/entities/company-team.entity';
import { TYPES } from '../../../infrastructure/di/types';
import { CreateCompanyTeamDto, UpdateCompanyTeamDto } from '../../dto/company/company-team.dto';
import { NotFoundError } from '../../../domain/errors/errors';

@injectable()
export class CompanyTeamUseCase {
  constructor(
    @inject(TYPES.CompanyTeamRepository)
    private readonly companyTeamRepository: ICompanyTeamRepository,
  ) {}

  async createTeamMember(companyId: string, data: CreateCompanyTeamDto): Promise<CompanyTeam> {
    const teamMember = CompanyTeam.create({ ...data, companyId });
    return this.companyTeamRepository.create(teamMember);
  }

  async getTeamMembersByCompanyId(companyId: string): Promise<CompanyTeam[]> {
    return this.companyTeamRepository.findByCompanyId(companyId);
  }

  async updateTeamMember(teamMemberId: string, data: UpdateCompanyTeamDto): Promise<CompanyTeam> {
    const existingTeamMember = await this.companyTeamRepository.findById(teamMemberId);
    if (!existingTeamMember) {
      throw new NotFoundError(`Company team member with ID ${teamMemberId} not found`);
    }
    const updatedTeamMember = existingTeamMember.updateTeamMember(data);
    return this.companyTeamRepository.update(updatedTeamMember);
  }

  async deleteTeamMember(teamMemberId: string): Promise<void> {
    await this.companyTeamRepository.delete(teamMemberId);
  }
}
