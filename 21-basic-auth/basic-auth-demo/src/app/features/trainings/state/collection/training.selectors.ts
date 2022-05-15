import { TrainingCollectionState } from './training.reducer';


export const getTraining = (trainingId: string) => {
  return (state: TrainingCollectionState) => state.trainingsMap[trainingId];
};
export const getTrainingsMap = (state: TrainingCollectionState) => state.trainingsMap;
