import {Platform, Plugin} from 'obsidian';

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
					const fs = require('fs')
					const {spawn} = require('child_process');

					//@ts-ignore
					const main_file_path = this.app.vault.adapter.basePath + '/main.py'

					if (!fs.existsSync(main_file_path)) {
						const file_data: string = 'print("=" * 80)\n' +
							'print("No main.py was found so one was created!")\n' +
							`print("Add your own code to this file: ${main_file_path}")\n` +
							'print("=" * 80)\n' +
							'input("Key enter to close.")'
						fs.writeFile(
							main_file_path,
							file_data,
							function (err: any) {
								if (err) {
									return console.error(err);
								}
							});
					}

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

