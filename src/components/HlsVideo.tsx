import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HlsVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = "https://stream.mux.com/bnYL6x5cAX6WiJv2pOKpITehZd3NVdXpj3ylJFpX5Lk.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1,
        capLevelToPlayerSize: false,
        maxMaxBufferLength: 60,
        enableWorker: true
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        hls.currentLevel = hls.levels.length - 1;
        video.play().catch(e => console.error("Video play failed", e));
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.error("Video play failed", e));
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-1/2 left-1/2"
      style={{
        width: '160%',
        height: '160%',
        objectFit: 'cover',
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

export default HlsVideo;
