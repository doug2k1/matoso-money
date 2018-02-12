// @flow
import React, { Fragment } from 'react';
import Box from '../Box';
import Table from '../Table';
import Button from '../Button';

export default class InvestmentsPage extends React.Component<{}, {}> {
  render() {
    return (
      <Fragment>
        {/*<div className="buttons-row">
          <Button icon="plus" size="small" label="Novo" />
        </div>*/}
        <Box
          title="Editar investimento"
          footer={
            <Fragment>
              <span className="pull-left">
                <Button label="Excluir" type="danger" icon="trash-o" />
              </span>
              <Button label="Cancelar" type="secondary" />
              <Button label="Salvar" icon="save" />
            </Fragment>
          }
        >
          [form]
        </Box>
        <Box>
          <Table
            columns={['Nome', 'Código', 'IR', 'Taxa', 'Cor']}
            data={[
              ['Tesouro Selic 2021', 'SE21', '15%', '0,8%', ''],
              ['Warren MM2', 'WMM2', '15%', '0%', '']
            ]}
          />
        </Box>
      </Fragment>
    );
  }
}
