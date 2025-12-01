import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * Utility class for CLI-related operations.
 */
export class CliUtils {
  /**
   * Checks if a command is available in the system PATH.
   *
   * @param command - The command to check (e.g., 'claude', 'cursor-agent')
   * @returns Promise resolving to true if command exists, false otherwise
   *
   * @example
   * ```ts
   * const hasCommand = await CliUtils.isCommandAvailable('claude');
   * // Returns: true if claude is installed
   * ```
   */
  static async isCommandAvailable(command: string): Promise<boolean> {
    const checkCmd =
      process.platform === "win32"
        ? `where ${command}`
        : `command -v ${command}`;

    try {
      await execAsync(checkCmd);
      return true;
    } catch {
      return false;
    }
  }
}
