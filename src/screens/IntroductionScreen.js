import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Layout, Text } from '@ui-kitten/components';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { fontLoaded: false };
	}

	render() {
		return (
			<Layout style={styles.container} level='1'>

				<Card style={styles.card} status='basic'>
					<Text>Welcome to Life Tracker!</Text>
				</Card>

			</Layout>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	card: {
		margin: 2,
	},
});
