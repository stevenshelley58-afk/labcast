import { weatherAgent } from './mastra/agents/weather-agent';

async function main() {
    console.log("Starting Weather Agent...");
    try {
        const response = await weatherAgent.generate('What is the weather in London?');
        console.log("Response:", response.text);
    } catch (error) {
        console.error("Agent run failed (expected if API key is invalid):");
        console.error(error);
    }
}

main();
