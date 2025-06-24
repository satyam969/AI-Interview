import Vapi from '@vapi-ai/web';

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);

// Start voice conversation
vapi.start('YOUR_ASSISTANT_ID');

// Listen for events
vapi.on('call-start', () => console.log('Call started'));
vapi.on('call-end', () => console.log('Call ended'));
vapi.on('message', (message) => {
  if (message.type === 'transcript') {
    console.log(`${message.role}: ${message.transcript}`);
  }
});
