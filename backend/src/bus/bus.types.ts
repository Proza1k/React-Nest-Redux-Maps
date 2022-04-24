import { Bus as BusModel } from 'src/models/bus.model';

export type BusDirection = {
  ident: string;
  directions: BusModel[];
};
