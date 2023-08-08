import {Platform, Plugin} from 'obsidian';
import {spawn} from "child_process";

export default class GnomeTerminal extends Plugin {

	async onload() {

		if (Platform.isDesktopApp) {
			const loadGnomeTerminal = this.addRibbonIcon(
				'terminal-square', 'Gnome Terminal', (evt: MouseEvent) => {
					const {spawn} = require('child_process');
					//@ts-ignore
					let openTerminalAtPath = spawn('gnome-terminal', {cwd: this.app.vault.adapter.basePath});
					openTerminalAtPath.on('error', (err: Error) => {
						console.log(err);
					});
				});
			loadGnomeTerminal.addClass('gnome-terminal-class');

			const gitPushGnomeTerminal = this.addRibbonIcon(
				'file-terminal', 'main.py (Gnome Terminal)', (evt: MouseEvent) => {
					const {spawn} = require('child_process');

					const command = 'gnome-terminal'
					const cmd_args = ["--", "python3", "main.py"]

					console.log(command)

					let openTerminalAtPath = spawn(command, cmd_args, {
						shell: true, //@ts-ignore
						cwd: this.app.vault.adapter.basePath
					});
					openTerminalAtPath.on('error', (err: Error) => {
						console.log(err);
					});
				});
			gitPushGnomeTerminal.addClass('git-push-gnome-terminal');
		}

	}

	onunload() {

	}

}

