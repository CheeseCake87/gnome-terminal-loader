import {Platform, Plugin} from 'obsidian';
import {spawn} from "child_process";

export default class GnomeTerminal extends Plugin {

	async onload() {

		if (Platform.isLinux) {
			const loadGnomeTerminal = this.addRibbonIcon(
				'terminal-square', 'Gnome Terminal', (evt: MouseEvent) => {
					const {spawn} = require('child_process');
					//@ts-ignore
					let openTerminalAtPath = spawn('gnome-terminal', {cwd: this.app.vault.adapter.basePath});
					openTerminalAtPath.on('error', (err: Error) => {
						console.log(err);
					});
				});

			const pythonGnomeTerminal = this.addRibbonIcon(
				'file-terminal', 'main.py (Gnome Terminal)', (evt: MouseEvent) => {
					const {spawn} = require('child_process');

					const command = 'gnome-terminal'
					const cmd_args = ["--", "python3", "main.py"]

					let openTerminalAtPath = spawn(command, cmd_args, {
						shell: true, //@ts-ignore
						cwd: this.app.vault.adapter.basePath
					});
					openTerminalAtPath.on('error', (err: Error) => {
						console.log(err);
					});
				});
		}

	}

	onunload() {

	}

}

