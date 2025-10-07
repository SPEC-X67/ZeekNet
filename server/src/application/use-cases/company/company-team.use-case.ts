import { ICompanyTeamRepository } from '../../../domain/interfaces/repositories/company-team.repository';
import { CompanyTeam } from '../../../domain/entities/company-team.entity';
import { CreateCompanyTeamDto, UpdateCompanyTeamDto } from '../../dto/company/company-team.dto';
import { NotFoundError } from '../../../domain/errors/errors';

export class CompanyTeamUseCase {
  constructor(
    private readonly _companyTeamRepository: ICompanyTeamRepository,
  ) {}

  async createTeamMember(companyId: string, data: CreateCompanyTeamDto): Promise<CompanyTeam> {
    const teamMember = CompanyTeam.create({ ...data, companyId });
    return this._companyTeamRepository.create(teamMember);
  }

  async getTeamMembersByCompanyId(companyId: string): Promise<CompanyTeam[]> {
    return this._companyTeamRepository.findByCompanyId(companyId);
  }

  async updateTeamMember(teamMemberId: string, data: UpdateCompanyTeamDto): Promise<CompanyTeam> {
    const existingTeamMember = await this._companyTeamRepository.findById(teamMemberId);
    if (!existingTeamMember) {
      throw new NotFoundError(`Company team member with ID ${teamMemberId} not found`);
    }
    const updatedTeamMember = await this._companyTeamRepository.update(teamMemberId, data);
    if (!updatedTeamMember) {
      throw new NotFoundError(`Failed to update company team member with ID ${teamMemberId}`);
    }
    return updatedTeamMember;
  }

  async deleteTeamMember(teamMemberId: string): Promise<void> {
    await this._companyTeamRepository.delete(teamMemberId);
  }
}
