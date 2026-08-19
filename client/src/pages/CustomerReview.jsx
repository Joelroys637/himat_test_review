import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Copy, RefreshCw, Loader2, Check } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'q1',
    text: 'What was the highlight of your experience?',
    options: [
      "The customer service was excellent.",
      "The quality was outstanding.",
      "The atmosphere was very welcoming.",
      "I was impressed by the speed and efficiency.",
      "The attention to detail was great."
    ]
  },
  {
    id: 'q2',
    text: 'How would you describe the value?',
    options: [
      "It's great value for the price.",
      "The pricing is very reasonable and affordable.",
      "It is worth every penny.",
      "The prices are fair for what you get."
    ]
  },
  {
    id: 'q3',
    text: 'Would you recommend this business?',
    options: [
      "I highly recommend it to everyone!",
      "Yes, I will definitely be returning.",
      "Absolutely, it's a great place to visit.",
      "I would definitely recommend it to my friends."
    ]
  }
];

const getRandomOptions = (options, count = 3) => {
  const shuffled = [...options].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function CustomerReview() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [vendorData, setVendorData] = useState(null);
  const [review, setReview] = useState('');
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const [step, setStep] = useState('questions'); // 'questions' or 'review'
  const [answers, setAnswers] = useState({});
  const [questionOptions, setQuestionOptions] = useState({});

  useEffect(() => {
    fetchVendorAndReview();
    
    // Initialize random options for each question
    const optionsMap = {};
    QUESTIONS.forEach(q => {
      optionsMap[q.id] = getRandomOptions(q.options, 3);
    });
    setQuestionOptions(optionsMap);
  }, [vendorId]);

  const fetchVendorAndReview = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch vendor data for shopName and googleReviewUrl
      const vendorRes = await fetch(`/api/vendors/${vendorId}`);
      const vendorJson = await vendorRes.json();

      if (!vendorJson.success) {
        navigate('/404');
        return;
      }
      
      setVendorData(vendorJson.vendor);

      // Do not automatically generate review; wait for answers
    } catch (err) {
      setError('Network error. Unable to load vendor.');
    } finally {
      setLoading(false);
    }
  };

  const generateReviewText = async () => {
    setLoading(true);
    try {
      const selectedAnswers = Object.values(answers);
      const reviewRes = await fetch(`/api/reviews/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId, answers: selectedAnswers })
      });
      const reviewJson = await reviewRes.json();

      if (reviewJson.success) {
        setReview(reviewJson.review);
        setStep('review');
      } else {
        setError('Failed to generate review.');
      }
    } catch (err) {
      setError('Failed to generate review.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    setStep('questions');
    setAnswers({});
    const optionsMap = {};
    QUESTIONS.forEach(q => {
      optionsMap[q.id] = getRandomOptions(q.options, 3);
    });
    setQuestionOptions(optionsMap);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(review);
      setCopied(true);
      setShowToast(true);
      
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  if (loading && !vendorData) {
    return (
      <div className="mobile-container" style={{ alignItems: 'center' }}>
        <Loader2 className="animate-spin" size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ color: 'var(--text-secondary)' }}>Generating your review...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mobile-container" style={{ alignItems: 'center', textAlign: 'center' }}>
        <div className="glass-card">
          <h3 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Oops!</h3>
          <p>{error}</p>
          <button onClick={fetchVendorAndReview} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="responsive-container">
      {showToast && (
        <div className="toast">
          ✓ Review copied successfully!
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div className="rating-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={28} fill="currentColor" />
          ))}
        </div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{vendorData?.shopName}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>We value your experience</p>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem 1rem' }}>
        
        {step === 'questions' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="questions-container">
              {QUESTIONS.map((q, index) => (
                <div key={q.id} className="question-column">
                  <p style={{ fontWeight: '600', marginBottom: '0.75rem' }}>{index + 1}. {q.text}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {(questionOptions[q.id] || []).map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                        className={`option-btn ${answers[q.id] === opt ? 'selected' : ''}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={generateReviewText}
              disabled={Object.keys(answers).length < QUESTIONS.length || loading}
              className="btn btn-primary"
              style={{ padding: '1rem', fontSize: '1.125rem', opacity: (Object.keys(answers).length < QUESTIONS.length || loading) ? 0.5 : 1 }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Generate Review'}
            </button>
          </div>
        ) : (
          <>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                <Loader2 className="animate-spin" size={32} color="var(--primary-color)" />
              </div>
            ) : (
              <div className="review-box">
                {review}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
              <button 
                onClick={handleCopy} 
                className="btn btn-primary"
                style={{ padding: '1rem', fontSize: '1.125rem' }}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied ? 'Copied' : 'Copy Review'}
              </button>

              <button 
                onClick={() => window.open(vendorData?.googleReviewUrl, '_blank')} 
                className="btn btn-secondary"
                style={{ 
                  padding: '1rem',
                  fontSize: '1.125rem',
                }}
              >
                <Star size={20} fill="currentColor" color="#fbbf24" />
                Leave a Google Review
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button 
                onClick={handleRegenerate}
                disabled={loading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                Start Over
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
