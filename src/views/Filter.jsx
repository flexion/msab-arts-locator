import React from 'react';
import { Box, Section, Level, LevelLeft, LevelRight, Button } from 'bloomer';

export const Filter = () => (
  <Level className="msab-has-background-purple msab-filter">
    <LevelLeft className="has-text-white">Filtered By</LevelLeft>
    <LevelRight>
      <Button>Select</Button>
    </LevelRight>
  </Level>
);
