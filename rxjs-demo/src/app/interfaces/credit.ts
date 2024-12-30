import { FileToUpload } from './file-to-upload';
import { PricingPlan } from './pricing-plan';
import { ReceiveMethod } from './receive-method';
import { User } from './user';

export interface Credit {
  userId: User;
  userEmail: User;
  amount: number;
  selectedReceiveMethod: ReceiveMethod;
  selectedPricingPlan: PricingPlan;
  filesUpload: FileToUpload[];
}
