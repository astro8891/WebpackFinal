import React from 'react';
import Note from './note';

export default class App extends React.Component {
	render() {
		var notes = [{
			task: 'Learn Webpack'
		}, {
			task: 'Learn React'
		}, {
			task: 'Do laundry'
		} ];
		return (
			<div>
				<ul>{notes.map((note, i) => <li key={'note' + i}>
				<Note task={note.task} />
				</li>
				)}</ul>
			</div>
		);
	}
}
