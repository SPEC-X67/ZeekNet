import { CompanyTeam } from '../entities/company-team.entity';
import { IBaseRepository } from './base.repository';

export interface ICompanyTeamRepository extends IBaseRepository<CompanyTeam> {
  findByCompanyId(companyId: string): Promise<CompanyTeam[]>;
}
