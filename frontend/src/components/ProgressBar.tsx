import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
    progress: number;
}

export function ProgressBar(props: ProgressBarProps) {
    return (
        <Progress.Root className="w-full h-3 mt-4 rounded-full relative overflow-hidden bg-zinc-700">
            <Progress.Indicator
                className="h-full bg-green-600 transition-all"
                style={{ width: `${props.progress}%` }}
            />
        </Progress.Root>
    )
}