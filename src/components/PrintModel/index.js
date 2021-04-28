import React from 'react'
import { IntlProvider, FormattedNumber } from 'react-intl';
import { SalesConsumer } from '../../contexts/SalesContext';
import styles from '../../styles/components/PrintModel.module.css'

export default class PrintModel extends React.PureComponent {
	render() {
		const data = this.props.data;
		return (
			<SalesConsumer>
				{(props) => {
					return (
						<div className={styles.receiptContainer} >
				<h2>Adega Recanto da Cerveja</h2>
				<IntlProvider locale="pt">
				<table>
					<thead>
						<tr>
							<th>Qtd.</th>
							<th>Descrição</th>
							<th>Preço</th>
						</tr>
					</thead>
					<tbody>
						{ props.products.map(item => (
							<tr>
								<td>{item.amount}</td>
								<td>{item.name}</td>
								<td><FormattedNumber value={item.price} style="currency" currency="BRL" /></td>
							</tr>
						))}
					</tbody>
				</table>
				</IntlProvider>
				<p>Obrigado Pela Preferência, Volte Sempre!</p>
			</div>
					)
				}}
			</SalesConsumer>
    )
	}
}