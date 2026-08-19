const Vendor = require('../models/Vendor');

const openings = [
  "I had a great experience at {shopName}.",
  "I really enjoyed my visit to {shopName}.",
  "I was very happy with my experience at {shopName}.",
  "I had a wonderful experience at {shopName}.",
  "Really enjoyed visiting {shopName}.",
  "My recent visit to {shopName} was fantastic."
];

const keywordTemplates = [
  "The {keyword} was excellent.",
  "The {keyword} really stood out.",
  "I especially liked the {keyword}.",
  "One of the best things was the {keyword}.",
  "I was really impressed by the {keyword}.",
  "The {keyword} exceeded my expectations."
];

const closings = [
  "I would definitely recommend this place.",
  "I will definitely visit again.",
  "Highly recommended!",
  "I would happily recommend this business to others.",
  "Can't wait to go back!",
  "A must-visit for sure."
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

exports.generateReview = async (req, res) => {
  try {
    const { vendorId, answers } = req.body;
    if (!vendorId) {
      return res.status(400).json({ success: false, message: 'vendorId is required' });
    }

    const vendor = await Vendor.findOneAndUpdate(
      { vendorId },
      { $inc: { totalReviewsGenerated: 1 } },
      { returnDocument: 'after' }
    );
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    const shopName = vendor.shopName;
    const keywords = vendor.keywords || [];

    // Select random opening
    let opening = getRandomElement(openings).replace('{shopName}', shopName);
    
    let bodySentences = [];
    let closing = "";

    if (answers && Array.isArray(answers) && answers.length > 0) {
      // Use user selected answers as body sentences
      bodySentences = [...answers];
    } else {
      // Fallback: Select 1 to 3 random keywords and create sentences
      if (keywords.length > 0) {
        // Shuffle keywords
        const shuffledKeywords = [...keywords].sort(() => 0.5 - Math.random());
        const numKeywordsToUse = Math.min(Math.floor(Math.random() * 2) + 1, shuffledKeywords.length); // 1 or 2 keywords
        
        for (let i = 0; i < numKeywordsToUse; i++) {
          const keyword = shuffledKeywords[i];
          let template = getRandomElement(keywordTemplates);
          bodySentences.push(template.replace('{keyword}', keyword.toLowerCase()));
        }
        
        // If there are more keywords left, occasionally combine them into a list
        if (shuffledKeywords.length > numKeywordsToUse && Math.random() > 0.5) {
           const extra = shuffledKeywords.slice(numKeywordsToUse, numKeywordsToUse + 2);
           if (extra.length === 1) {
              bodySentences.push(`Also, the ${extra[0].toLowerCase()} was great.`);
           } else {
              bodySentences.push(`I also loved the ${extra[0].toLowerCase()} and the ${extra[1].toLowerCase()}.`);
           }
        }
      }
      // Select random closing only if fallback is used
      closing = getRandomElement(closings);
    }

    const fullReviewParts = [opening, ...bodySentences];
    if (closing) {
      fullReviewParts.push(closing);
    }
    const fullReview = fullReviewParts.join(' ');

    res.status(200).json({
      success: true,
      review: fullReview
    });

  } catch (error) {
    console.error('Error generating review:', error);
    res.status(500).json({ success: false, message: 'Failed to generate review' });
  }
};
