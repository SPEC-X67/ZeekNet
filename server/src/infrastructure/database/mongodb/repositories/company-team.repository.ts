import { injectable } from 'inversify';
import { ICompanyTeamRepository } from '../../../../domain/repositories/company-team.repository';
import { CompanyTeam } from '../../../../domain/entities/company-team.entity';
import { CompanyTeamModel } from '../models/company-team.model';
import { Types } from 'mongoose';

@injectable()
export class MongoCompanyTeamRepository implements ICompanyTeamRepository {
  async create(teamMember: CompanyTeam): Promise<CompanyTeam> {
    const teamMemberDoc = new CompanyTeamModel({
      companyId: new Types.ObjectId(teamMember.companyId),
      name: teamMember.name,
      role: teamMember.role,
      avatar: teamMember.avatar,
      instagram: teamMember.instagram,
      linkedin: teamMember.linkedin,
    });

    const savedTeamMember = await teamMemberDoc.save();
    return this.mapDocumentToEntity(savedTeamMember);
  }

  async findById(id: string): Promise<CompanyTeam | null> {
    const teamMember = await CompanyTeamModel.findById(id);
    return teamMember ? this.mapDocumentToEntity(teamMember) : null;
  }

  async findByCompanyId(companyId: string): Promise<CompanyTeam[]> {
    const teamMembers = await CompanyTeamModel.find({ companyId: new Types.ObjectId(companyId) });
    return teamMembers.map(teamMember => this.mapDocumentToEntity(teamMember));
  }

  async update(teamMember: CompanyTeam): Promise<CompanyTeam> {
    const updatedTeamMember = await CompanyTeamModel.findByIdAndUpdate(
      teamMember.id,
      {
        name: teamMember.name,
        role: teamMember.role,
        avatar: teamMember.avatar,
        instagram: teamMember.instagram,
        linkedin: teamMember.linkedin,
      },
      { new: true }
    );

    if (!updatedTeamMember) {
      throw new Error('Team member not found');
    }

    return this.mapDocumentToEntity(updatedTeamMember);
  }

  async delete(id: string): Promise<void> {
    await CompanyTeamModel.findByIdAndDelete(id);
  }

  private mapDocumentToEntity(doc: any): CompanyTeam {
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
}

