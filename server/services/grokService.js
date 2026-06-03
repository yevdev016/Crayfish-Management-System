import Groq from "groq-sdk";
const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

const buildPrompt = (type, data) => {
    const intro = `You are a helpful crayfish farm assistant. Your job is to analyze the user's farm data and write a clear, informative report in plain markdown.

Formatting rules:
- Use ## for main section headings only — do not use bold markers like ** or __ for section titles
- Use plain bullet points for lists
- Use markdown tables (| column | column |) whenever presenting structured data — stage breakdowns, habitat comparisons, pricing, transitions, etc. Tables make the report scannable and professional
- Keep paragraphs short and scannable
- If data is empty, gently say so and give general guidance instead of forcing an analysis
- Start with a ## Summary section that highlights the most important takeaway, then cover the detailed sections below
- Write in a natural, conversational tone — avoid robotic lists and overly formal language
- All prices are in Philippine Peso — display them as "Pesos" (e.g., 150.00 Pesos) and never use $ or ₱ symbols`

    switch(type) {
        case 'habitat':
            return `${intro}

Report type: Habitat Health Report

Here is the habitat data for analysis:
${JSON.stringify(data, null, 2)}

Use tables where possible. For example:
- | Habitat | Species | Count | Stage |
- | Stage | Count | Percentage |
- | Habitat | Count | Status |

Cover these sections:
1. Population Overview — Total crayfish across all habitats, average per habitat. Show a summary table of all habitats.
2. Stage Distribution — Present a table breaking down count by stage (Berried, Crayling, Juvenile, Adult, Breeder). Identify which stage dominates.
3. Habitat Highlights — Compare habitats side by side in a table. Note any with unusually high or low counts.
4. Recommendations — Be specific about which habitats to harvest, restock, or breed next.`
        case 'sales-stock':
            return `${intro}

Report type: Sales & Inventory Report

Here is the sales and stock data for analysis:
${JSON.stringify(data, null, 2)}

Use tables where possible. For example:
- | Habitat | Species | Count | Available | Sold | Price |
- | Status | Count | Total Value |

Cover these sections:
1. Stock Overview — Total stock, available vs sold. Show a table per habitat with its contribution.
2. Pricing Analysis — Average price, highest and lowest priced items. Use a table to compare items.
3. Sales Performance — Which species and stages sell best. Table format. Highlight unsold stock.
4. Recommendations — Suggest which stock to sell first, which habitats to harvest next, and pricing advice.`
        case 'lifecycle': {
            return `${intro}

Report type: Lifecycle & Stage Transition Report

Here is the lifecycle data (transitions and current habitat stages) for analysis:
${JSON.stringify(data, null, 2)}

Use tables where possible. For example:
- | From Stage | To Stage | Count | Date |
- | Stage | Current Count | Percentage |

Cover these sections:
1. Transition Summary — Total transitions recorded. Show a table of the most common stage-to-stage paths.
2. Progression Efficiency — Are crayfish moving through stages smoothly? Identify where they tend to get stuck.
3. Bottleneck Detection — Highlight slow or blocked transitions in a table. Note any stage losing more than it gains.
4. Recommendations — Best timing for harvest, which habitats to move to the next stage, and breeding opportunities.`
        }
        case 'activity':
            return `${intro}

Report type: Operations Activity Report

Here is the recent activity log for analysis:
${JSON.stringify(data, null, 2)}

Use tables where possible. For example:
- | Action | Time | Type |

Cover these sections:
1. Activity Patterns — What type of actions are happening most (feeding, harvesting, cleaning, etc.)
2. Notable Events — Any unusual or important actions worth highlighting
3. Farm Pulse — Is the farm being actively managed? Are there long gaps with no activity?
4. Suggestions — What the farmer should focus on next based on recent activity patterns`
        default:
            throw new Error(`Unknown report type: ${type}`)
    }
}
export const generateReport = async(type, data) => {
    try {
        const prompt = buildPrompt(type, data)
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.3-70b-versatile'
        });
        const text = chatCompletion.choices[0]?.message?.content || '';
        return text;
    } catch(err){
        console.error('Groq API error: ', err);
        throw new Error("Failed to generate report");
        
    }
}