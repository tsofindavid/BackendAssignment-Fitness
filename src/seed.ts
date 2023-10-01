import { DatabaseConnection } from './database/database-connection';
import { ProgramModel } from './database/models/program.model';
import { ExerciseModel } from './database/models/exercise.model';
import { ExerciseDifficulty } from './enums/exercise.enums';

const seedDB = async () => {
  await DatabaseConnection.init();

  await DatabaseConnection.connection.sync({ force: true });

  const programs = await ProgramModel.bulkCreate(
    [
      {
        name: 'Program 1',
      },
      {
        name: 'Program 2',
      },
      {
        name: 'Program 3',
      },
    ] as any[],
    { returning: true }
  );

  await ExerciseModel.bulkCreate([
    {
      name: 'Exercise 1',
      difficulty: ExerciseDifficulty.EASY,
      programId: programs[0].id,
    },
    {
      name: 'Exercise 2',
      difficulty: ExerciseDifficulty.EASY,
      programId: programs[1].id,
    },
    {
      name: 'Exercise 3',
      difficulty: ExerciseDifficulty.MEDIUM,
      programId: programs[0].id,
    },
    {
      name: 'Exercise 4',
      difficulty: ExerciseDifficulty.MEDIUM,
      programId: programs[0].id,
    },
    {
      name: 'Exercise 5',
      difficulty: ExerciseDifficulty.HARD,
      programId: programs[0].id,
    },
    {
      name: 'Exercise 6',
      difficulty: ExerciseDifficulty.HARD,
      programId: programs[1].id,
    },
  ]);
};

seedDB()
  .then(() => {
    console.log('DB seed done');
    process.exit(0);
  })
  .catch(err => {
    console.error('error in seed, check your data and model \n \n', err);
    process.exit(1);
  });
