// @flow
import React from 'react';
import Box from '../Box';
import Table from '../Table';
import Button from '../Button';

export default class PerformancePage extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <Box footer={<Button label="Adicionar" icon="plus" />} />
        <Box title="Entradas">
          <Table
            columns={['Data', 'Warren', 'Selic']}
            data={[
              ['12/01/2018', '1,1%', '0,3%'],
              ['09/01/2018', '1,0%', '0,1%']
            ]}
          />
        </Box>
      </>
    );
  }
}
