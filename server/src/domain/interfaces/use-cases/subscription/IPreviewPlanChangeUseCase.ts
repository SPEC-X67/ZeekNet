import { PreviewPlanChangeRequestDto, PreviewPlanChangeResponseDto } from 'src/application/dtos/subscription/subscription.dto';;
;

export interface IPreviewPlanChangeUseCase {
    execute(data: PreviewPlanChangeRequestDto): Promise<PreviewPlanChangeResponseDto>;
}
