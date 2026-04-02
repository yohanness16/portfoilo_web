import useSound from 'use-sound';

export const useCyberSound = () => {
 
  const [playScan] = useSound('/audio/scan-glitch.mp3', { volume: 0.2 });
  const [playBeep] = useSound('/audio/data-beep.mp3', { volume: 0.15 });

  
  const [playWarp] = useSound('/audio/smooth-warp.mp3', { volume: 0.25 });

 
  const [playTechHover] = useSound('/audio/tech-click.mp3', { volume: 0.1 });

 
  const [playDeploy] = useSound('/audio/scifi-deploy.mp3', { volume: 0.3 });

 
  const [playSignal] = useSound('/audio/signal-transmission.mp3', { volume: 0.2 });

  return { playScan, playBeep, playWarp, playTechHover, playDeploy, playSignal };
};