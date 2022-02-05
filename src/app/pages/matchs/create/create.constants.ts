import { MatchForm } from '../../../interfaces/match.interface';

export const positions: string[] = ['gk','lb','rb','lf','rf'];

export const formSteps: MatchForm[] = [
    {
      title: 'Home Team',
      control: 'home_color',
      buttonLabel: 'Continue'
    },
    {
      title: 'Away Team',
      control: 'away_color',
      buttonLabel: 'Continue'
    },
    {
      title: 'Players',
      buttonLabel: 'Continue'
    },
    {
      title: 'Schedule',
      buttonLabel: 'Create'
    },
    {
      title: 'Match Created',
      buttonLabel: 'Menu'
    },
];
