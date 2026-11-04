import { MenuItem } from '../types';

export interface AssistantReply {
  text: string;
  recommendedItemIds: string[];
}

/**
 * Modular student assistant response handler.
 * Designed for future plug-and-play connection to Amazon PartyRock Bedrock workflows.
 */
export function getStudentAssistantReply(userQuery: string, menuItems: MenuItem[]): AssistantReply {
  const query = userQuery.toLowerCase().trim();

  // Find items by filter
  const under50 = menuItems.filter(m => m.price <= 50 && m.available);
  const vegItems = menuItems.filter(m => m.type === 'veg' && m.available);
  const fillingMeals = menuItems.filter(m => m.category === 'Meals' && m.available);
  const snacks = menuItems.filter(m => m.category === 'Snacks' && m.available);

  if (query.includes('50') || query.includes('under 50') || query.includes('cheap') || query.includes('budget')) {
    return {
      text: "Here are some of the most satisfying options under ₹50 available right now. I recommend the Veg Fried Rice for a wholesome hot lunch!",
      recommendedItemIds: ['m1', 'm3', 'm5', 'm4'],
    };
  }

  if (query.includes('filling') || query.includes('hungry') || query.includes('lunch') || query.includes('heavy')) {
    return {
      text: "If you're looking for a hearty, energy-packed meal to power through afternoon lectures, here are the top filling options prepared fresh right now:",
      recommendedItemIds: ['m7', 'm1', 'm20', 'm16'],
    };
  }

  if (query.includes('veg') || query.includes('vegetarian') || query.includes('pure veg')) {
    return {
      text: "Our kitchen has high-demand vegetarian dishes freshly prepped today. Here are the top student-rated vegetarian picks:",
      recommendedItemIds: ['m4', 'm3', 'm1', 'm7'],
    };
  }

  if (query.includes('two') || query.includes('100') || query.includes('pair') || query.includes('friend')) {
    return {
      text: "Great combo ideas for two people under ₹100:\n• 1 Veg Fried Rice (₹50) + 1 Paneer Sandwich (₹40) = ₹90\n• 2 Masala Dosas (2 × ₹45) = ₹90\n• 2 Samosa plates (₹30) + 2 Masala Teas (₹20) + 1 Cold Coffee (₹40) = ₹90",
      recommendedItemIds: ['m1', 'm3', 'm4', 'm8'],
    };
  }

  if (query.includes('snack') || query.includes('quick') || query.includes('tea') || query.includes('break')) {
    return {
      text: "For a quick 10-minute break between classes, these hot snacks and quick sips are ready in under 3 minutes:",
      recommendedItemIds: ['m8', 'm9', 'm10', 'm3'],
    };
  }

  if (query.includes('available') || query.includes('menu') || query.includes('today')) {
    return {
      text: "Currently, 29 out of 30 menu items are active and in stock at Main Canteen. Popular items are moving fast, especially Veg Fried Rice and Masala Dosa!",
      recommendedItemIds: ['m1', 'm2', 'm4', 'm10'],
    };
  }

  // Fallback smart response
  return {
    text: `Based on current canteen availability and student favorites today, here are personalized recommendations for you:`,
    recommendedItemIds: ['m1', 'm2', 'm3', 'm4'],
  };
}

/**
 * Modular admin assistant response handler.
 * Designed for future plug-and-play connection to Amazon PartyRock Bedrock workflows.
 */
export function getAdminAssistantReply(userQuery: string): string {
  const query = userQuery.toLowerCase().trim();

  if (query.includes('tomorrow') || query.includes('prepare more') || query.includes('demand')) {
    return "Based on past Wednesday attendance patterns and today's sales velocity:\n\n1. Increase Veg Fried Rice batch from 60 to 80 portions (+33%). It sold out early by 1:15 PM today.\n2. Samosas showed zero wastage and peaked at 11:30 AM; increase morning batch to 120 pieces.\n3. Hold back on Paneer Sandwiches to 25 portions to avoid end-of-day bread wastage.";
  }

  if (query.includes('sell') || query.includes('most') || query.includes('popular') || query.includes('top')) {
    return "Top 3 highest-revenue items today:\n\n1. Veg Fried Rice: 74 orders (₹3,700)\n2. Chicken Roll: 62 orders (₹2,790)\n3. Special Veg Thali: 38 orders (₹2,660)\n\nFast Food & Meals generated 62% of gross canteen revenue.";
  }

  if (query.includes('waiting') || query.includes('wait') || query.includes('delay') || query.includes('queue')) {
    return "Average waiting time peaked at 11.2 minutes between 12:45 PM and 1:20 PM today. Root causes:\n• 48 orders arrived simultaneously within a 20-minute window.\n• Fryer station had a queue bottleneck with French Fries and Samosas.\nRecommendation: Stagger slot discounts for 1:30 PM pickups.";
  }

  if (query.includes('wastage') || query.includes('waste') || query.includes('reduce')) {
    return "Wastage audit from the last 7 days indicates:\n\n• Paneer Sandwich: Average 4 unsold portions/day (estimated loss ₹160/day).\n• Steamed Idli: 3 portions wasted on rainy days.\nActionable solution: Switch Paneer Sandwiches to make-on-demand after 2:00 PM.";
  }

  return "AI Canteen Intelligence analysis: Operations are currently running at 94% efficiency with a 7.4-minute average fulfillment time. Inventory levels are healthy, with 3 items approaching the re-order threshold.";
}
