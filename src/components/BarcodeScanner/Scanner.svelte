<script>
  import { onMount, onDestroy } from 'svelte';

  export let onDetected;
  export let onError;

  let videoRef;

  const startVideo = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        throw new Error('navigator.mediaDevices API is not available in this browser.');
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');

      const backCameras = videoDevices.filter((device) =>
        device.label.toLowerCase().includes('facing back')
      );

      let stream;
      if (backCameras.length > 0) {
        const selectedDeviceId =
          backCameras.length > 1 ? backCameras[1].deviceId : backCameras[0].deviceId;

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: selectedDeviceId },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            advanced: [{ zoom: 2.0 }],
          },
        });
      } else {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            advanced: [{ zoom: 3.0 }],
          },
        });
      }

      videoRef.srcObject = stream;
      videoRef.setAttribute('playsinline', true);
      videoRef.play();

      if ('BarcodeDetector' in window) {
        const barcodeDetector = new window.BarcodeDetector({
          formats: ['code_128', 'ean_13', 'ean_8'],
        });

        const detectBarcode = async () => {
          if (videoRef.readyState === videoRef.HAVE_ENOUGH_DATA) {
            const barcodes = await barcodeDetector.detect(videoRef);
            if (barcodes.length > 0) {
              onDetected(barcodes[0].rawValue);
              stream.getTracks().forEach((track) => track.stop());
            }
          }
          requestAnimationFrame(detectBarcode);
        };

        requestAnimationFrame(detectBarcode);
      } else {
        onError('BarcodeDetector API não está disponível neste navegador.');
      }
    } catch (err) {
      onError(err);
    }
  };

  onMount(() => {
    startVideo();

    return () => {
      if (videoRef.srcObject) {
        videoRef.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  });
</script>

<div class="video-container">
  <video bind:this={videoRef}>
    <track kind="captions" />
  </video>
</div>

<style lang="scss">
  .video-container {
    width: calc(100% - 60px);
    left: 30px;
    height: auto;
    position: absolute;
    top: 30px;
  }
</style>
