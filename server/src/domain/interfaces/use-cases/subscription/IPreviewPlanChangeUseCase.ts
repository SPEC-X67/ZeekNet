import { PreviewPlanChangeRequestDto, PreviewPlanChangeResponseDto } from 'src/application/dtos/company-subscription.dto';;
;

export interface IPreviewPlanChangeUseCase {
    execute(data: PreviewPlanChangeRequestDto): Promise<PreviewPlanChangeResponseDto>;
}
