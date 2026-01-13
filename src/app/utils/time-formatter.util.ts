/**
 * Formats a duration in seconds to a human-readable string
 * Formats as MM:SS for videos under 1 hour
 * Formats as HH:MM:SS for videos 1 hour or longer
 *
 * @param seconds - The duration in seconds
 * @returns Formatted duration string (e.g., "3:45" or "1:23:45")
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
