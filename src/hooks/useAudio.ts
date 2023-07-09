import { useEffect, useState } from "react";

const useAudio = (sound:  any) => {
    const [audio] = useState(new Audio(sound))
    const [playing, setPlaying] = useState(false);

    const stopAudio = () => {
        setPlaying(false)
    }

    const playAudio = () => {
        setPlaying(true)
    }

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing, audio]);

    return { playing, stopAudio, playAudio };
}

export default useAudio;