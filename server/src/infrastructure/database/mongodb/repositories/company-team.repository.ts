import { ICompanyTeamRepository } from '../../../../domain/interfaces/repositories/company-team.repository';
import { CompanyTeam } from '../../../../domain/entities/company-team.entity';
import { CompanyTeamModel } from '../models/company-team.model';
import { Types } from 'mongoose';
import { MongoBaseRepository } from '../../../../shared/base';

export class MongoCompanyTeamRepository extends MongoBaseRepository<CompanyTeam> implements ICompanyTeamRepository {
  constructor() {
    super(CompanyTeamModel);
  }

  /**
   * Map MongoDB document to CompanyTeam entity
   */
  protected mapToEntity(doc: any): CompanyTeam {
    return CompanyTeam.fromJSON({
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      name: doc.name,
      role: doc.role,
      avatar: doc.avatar,
      instagram: doc.instagram,
      linkedin: doc.linkedin,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  /**
   * Override create to handle ObjectId conversion
   */
  async create(teamMember: Omit<CompanyTeam, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyTeam> {
    const teamMemberDoc = new CompanyTeamModel({
      companyId: new Types.ObjectId(teamMember.companyId),
      name: teamMember.name,
      role: teamMember.role,
      avatar: teamMember.avatar,
      instagram: teamMember.instagram,
      linkedin: teamMember.linkedin,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedTeamMember = await teamMemberDoc.save();
    return this.mapToEntity(savedTeamMember);
  }

  async findByCompanyId(companyId: string): Promise<CompanyTeam[]> {
    const teamMembers = await CompanyTeamModel.find({ companyId: new Types.ObjectId(companyId) });
    return teamMembers.map(teamMember => this.mapToEntity(teamMember));
  }

  /**
   * Override update to handle ObjectId conversion
   */
  async update(id: string, data: Partial<CompanyTeam>): Promise<CompanyTeam | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const updatedTeamMember = await CompanyTeamModel.findByIdAndUpdate(
      id,
      {
        ...data,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return updatedTeamMember ? this.mapToEntity(updatedTeamMember) : null;
  }
}

