class PhishingGame {
    constructor() {
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.stats = {
            correct: 0,
            wrong: 0,
            totalTime: 0,
            startTime: Date.now()
        };
        this.questions = this.getQuestions();
        this.displayCurrentQuestion();
        this.updateStats();
    }

    updateStats() {
        const statsDiv = document.getElementById('stats');
        if (!statsDiv) return;

        const accuracy = this.stats.correct + this.stats.wrong === 0 ? 0 :
            Math.round((this.stats.correct / (this.stats.correct + this.stats.wrong)) * 100);

        const timeElapsed = Math.round((Date.now() - this.stats.startTime) / 1000);
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        const timeDisplay = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

        statsDiv.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 p-3">
                <div class="bg-white rounded-xl p-3 text-center transform transition-all duration-200 hover:scale-105 shadow-sm">
                    <div class="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-green-100 rounded-lg">
                        <svg class="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                    <div class="text-xs font-medium text-green-700 mb-1">Correct</div>
                    <div class="text-2xl font-bold text-green-800">${this.stats.correct}</div>
                </div>

                <div class="bg-white rounded-xl p-3 text-center transform transition-all duration-200 hover:scale-105 shadow-sm">
                    <div class="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-red-100 rounded-lg">
                        <svg class="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>
                    <div class="text-xs font-medium text-red-700 mb-1">Wrong</div>
                    <div class="text-2xl font-bold text-red-800">${this.stats.wrong}</div>
                </div>

                <div class="bg-white rounded-xl p-3 text-center transform transition-all duration-200 hover:scale-105 shadow-sm">
                    <div class="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-lg">
                        <svg class="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                    </div>
                    <div class="text-xs font-medium text-blue-700 mb-1">Accuracy</div>
                    <div class="text-2xl font-bold text-blue-800">${accuracy}%</div>
                </div>

                <div class="bg-white rounded-xl p-3 text-center transform transition-all duration-200 hover:scale-105 shadow-sm">
                    <div class="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-purple-100 rounded-lg">
                        <svg class="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <div class="text-xs font-medium text-purple-700 mb-1">Time</div>
                    <div class="text-2xl font-bold text-purple-800">${timeDisplay}</div>
                </div>
            </div>
        `;
    }

    showGameOver() {
        const emailDisplay = document.getElementById('email-display');
        const feedback = document.getElementById('feedback');

        // Clear the email display and feedback
        emailDisplay.innerHTML = `
            <div class="max-w-2xl mx-auto p-6 text-center">
                <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-3">Test Complete!</h2>
                    <div class="text-5xl font-bold text-indigo-600 mb-2">${this.score}</div>
                    <p class="text-lg text-gray-600">points</p>
                </div>

                <div class="space-y-3">
                    <button onclick="window.location.reload()" 
                        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium text-base transform transition-all duration-200 hover:scale-105">
                        Take Test Again
                    </button>
                    <button onclick="window.location.href='protection-tips.html'" 
                        class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium text-base transform transition-all duration-200 hover:scale-105">
                        View Protection Tips
                    </button>
                </div>
            </div>
        `;

        // Hide the feedback section
        if (feedback) {
            feedback.classList.add('hidden');
        }

        // Hide the question buttons
        const buttonsContainer = document.querySelector('.p-6.bg-gray-50\\/80');
        if (buttonsContainer) {
            buttonsContainer.style.display = 'none';
        }
    }

    getQuestions() {
        const allQuestions = [
            {
                id: 1,
                type: "email",
                sender: "netflix@account-security-notice.com",
                subject: "🚨 Netflix Payment Declined - Immediate Action Required",
                content: `Dear Valued Netflix Member,

We regret to inform you that we were unable to process your last payment for your Netflix subscription. This may be due to insufficient funds, an expired card, or a change in your payment information.

To prevent any interruption to your streaming service, please update your payment information within the next 24 hours by clicking the secure link below:

https://netflix-account-verify.com/secure/payment?token=nx28a9

Account Details:
- Subscription Plan: Premium
- Last Payment Attempt: ${new Date().toLocaleDateString()}
- Amount Due: $15.99

If we do not receive your updated payment information, your account will be suspended, and you may lose access to your personalized profiles and watchlist.

Note: If you believe this is an error or need assistance, please contact our customer support team.

Best regards,
The Netflix Team`,
                clues: [
                    "Suspicious sender domain (not netflix.com)",
                    "Creates urgency with 24-hour deadline",
                    "Threatens account suspension",
                    "Generic greeting",
                    "Contains suspicious link"
                ],
                isPhishing: true,
                explanation: "This is a phishing attempt. Netflix only sends emails from @netflix.com domain. The email creates artificial urgency and threatens account suspension to pressure users into clicking the link."
            },
            {
                id: 2,
                type: "email",
                sender: "order-confirmation@amazon.com",
                subject: "Your Amazon.com order #112-3456789-0123456",
                content: `Hello,

Thank you for shopping with Amazon.com!

Your Order Details:
Order #: 112-3456789-0123456
Estimated Delivery: ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}

Items Ordered:
1. Apple AirPods Pro (2nd Generation) - $249.00
2. AppleCare+ for Headphones - $29.00

Subtotal: $278.00
Shipping & Handling: $0.00 (Prime Delivery)
Tax: $22.24
Total: $300.24

Your order will be sent to:
John Smith
123 Main Street
Anytown, CA 90210

You can track your package or view your order details by visiting Your Orders on Amazon.com.

Thank you for shopping with us!

Amazon.com
Note: This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.`,
                clues: [
                    "Official Amazon.com domain",
                    "Specific order number",
                    "Detailed order information",
                    "No clickable links",
                    "Professional formatting"
                ],
                isPhishing: false,
                explanation: "This is a legitimate Amazon order confirmation email. It contains specific order details, uses the official amazon.com domain, and doesn't ask for any action or personal information."
            },
            {
                id: 3,
                type: "email",
                sender: "security@paypal-account-verify.net",
                subject: "⚠️ PayPal: Unusual Login Activity Detected",
                content: `Dear valued PayPal customer,

Our security system has detected unusual login attempts on your PayPal account from the following location:

Device: Windows PC
Location: Moscow, Russia
IP Address: 185.147.23.XXX
Time: ${new Date().toLocaleTimeString()} (Your local time)

For your security, we have temporarily limited access to your account. To restore full access and prevent unauthorized transactions, please verify your identity immediately:

https://paypal-secure-center.net/verify/account?id=pp29x8

Important Security Tips:
- Update your password regularly
- Enable two-factor authentication
- Monitor your account activity

If you do not verify your identity within 12 hours, your account access will remain limited, and pending transactions may be cancelled.

Thank you for helping us maintain the security of your account.

Best regards,
PayPal Security Team`,
                clues: [
                    "Suspicious sender domain (not paypal.com)",
                    "Creates urgency with time limit",
                    "Shows IP to appear legitimate",
                    "Generic greeting",
                    "Contains suspicious link"
                ],
                isPhishing: true,
                explanation: "This is a sophisticated phishing attempt. While it includes technical details to appear legitimate, PayPal only sends emails from @paypal.com domain. The email also creates urgency and uses fear tactics."
            },
            {
                id: 4,
                type: "email",
                sender: "no-reply@dropbox.com",
                subject: "Someone shared a file with you on Dropbox",
                content: `Hi there,

John Smith (john.smith@company.com) shared a file with you on Dropbox:

"Q4_Financial_Report.xlsx" (2.3 MB)

You can view this file at: https://www.dropbox.com/s/shared/abc123xyz

Note: This link will expire in 14 days.

Happy collaborating!
The Dropbox Team

Note: If you don't want to receive these notifications, you can change your notification settings in your account preferences.`,
                clues: [
                    "Official Dropbox.com domain",
                    "Specific file details",
                    "Official Dropbox URL",
                    "No urgent language",
                    "Professional formatting"
                ],
                isPhishing: false,
                explanation: "This is a legitimate Dropbox file sharing notification. It uses the official dropbox.com domain and follows Dropbox's standard file sharing format."
            },
            {
                id: 5,
                type: "email",
                sender: "security@wells-fargo-secure.net",
                subject: "⚠️ Urgent: Your Wells Fargo Account Has Been Limited",
                content: `Dear Valued Customer,

Our fraud detection system has identified suspicious transactions on your Wells Fargo account:

Transaction Details:
Date: ${new Date().toLocaleString()}
Amount: $2,499.99
Location: Lagos, Nigeria
Type: International Wire Transfer

Your account access has been temporarily restricted to prevent unauthorized transactions. To restore full access to your account, please verify your identity immediately:

https://wellsfargo-secure-verify.net/auth/verify?user=wf47x9

WARNING: If you do not verify your identity within 2 hours:
• All pending transactions will be cancelled
• Your account will remain restricted
• Your cards will be temporarily disabled

For your security, please have your:
- Account number
- Social Security number
- Credit/Debit card information ready

Wells Fargo Security Department`,
                clues: [
                    "Suspicious sender domain (not wellsfargo.com)",
                    "Extreme urgency (2-hour deadline)",
                    "Asks for sensitive information",
                    "Generic greeting",
                    "Suspicious link with unusual domain"
                ],
                isPhishing: true,
                explanation: "This is a sophisticated phishing attempt. Wells Fargo only sends emails from @wellsfargo.com. The email creates extreme urgency and asks for highly sensitive information."
            },
            {
                id: 6,
                type: "email",
                sender: "notifications@linkedin.com",
                subject: "John Smith has endorsed you for Leadership",
                content: `Hi there,

Great news! John Smith has endorsed you for Leadership on LinkedIn.

John Smith
Senior Manager at Tech Company
500+ connections

Want to return the favor? Endorse John for their skills:
https://www.linkedin.com/skill-endorsement/abc123

You can manage your endorsements from your LinkedIn profile.

Thanks for being part of our professional community!

LinkedIn Professional Team
This email was intended for user@example.com
© 2024 LinkedIn Corporation, 1000 West Maude Avenue, Sunnyvale, CA 94085.`,
                clues: [
                    "Official LinkedIn.com domain",
                    "Specific user details",
                    "Official LinkedIn URL",
                    "No urgent language",
                    "Standard LinkedIn footer"
                ],
                isPhishing: false,
                explanation: "This is a legitimate LinkedIn notification. It uses the official linkedin.com domain and follows LinkedIn's standard email format."
            },
            {
                id: 7,
                type: "email",
                sender: "support@apple-id-verify.com",
                subject: "🔔 Apple ID: Account Security Verification Required",
                content: `Dear Apple Customer,

We detected multiple failed login attempts to your Apple ID from an unrecognized device. As a security measure, we have temporarily restricted access to your account.

Device Information:
- Model: MacBook Pro
- Location: Kiev, Ukraine
- Time: ${new Date().toLocaleString()}

To restore access to your Apple ID and prevent unauthorized purchases, please verify your account information:

https://apple-id-verify.com/secure/verification?id=ap39x7

If you do not verify your account within 24 hours:
• Your Apple ID will be suspended
• All associated devices will be removed
• Pending purchases will be cancelled

Apple takes account security very seriously. We recommend:
- Using two-factor authentication
- Creating a strong password
- Regularly reviewing your account activity

Best regards,
Apple Support Team`,
                clues: [
                    "Suspicious sender domain (not apple.com)",
                    "Creates urgency with time limit",
                    "Threatens account suspension",
                    "Generic greeting",
                    "Contains suspicious link"
                ],
                isPhishing: true,
                explanation: "This is a phishing attempt. Apple only sends emails from @apple.com domain. The email creates urgency and uses threats to manipulate users."
            },
            {
                id: 8,
                type: "email",
                sender: "billing@microsoft.com",
                subject: "Your Microsoft 365 subscription renewal notice",
                content: `Hello John,

Your Microsoft 365 Family subscription will renew on ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}.

Subscription Details:
- Product: Microsoft 365 Family
- Price: $99.99/year
- Renewal Date: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
- Payment Method: Visa ending in ****1234

No action is required. Your subscription will automatically renew to ensure uninterrupted access to Microsoft 365 apps and services.

To review or manage your subscription, visit:
https://account.microsoft.com/services

If you have questions about your subscription or need assistance, please visit our Help Center at https://support.microsoft.com.

Thank you for choosing Microsoft 365.

Best regards,
The Microsoft Billing Team

Note: This is a service notification. Microsoft will use your email address only for sending you service notifications.`,
                clues: [
                    "Official Microsoft.com domain",
                    "Specific subscription details",
                    "Official Microsoft URLs",
                    "No urgent action required",
                    "Professional tone"
                ],
                isPhishing: false,
                explanation: "This is a legitimate Microsoft subscription renewal notice. It uses the official microsoft.com domain, provides specific account details, and links to official Microsoft websites."
            },
            {
                id: 9,
                type: "email",
                sender: "security-alert@google-verify.net",
                subject: "⚠️ Google Account Security Alert - Action Required",
                content: `Security Alert

Your Google Account was just signed in to from a new device. If this wasn't you, someone else might be using your account.

Sign-in details:
Date: ${new Date().toLocaleString()}
Location: Beijing, China
Device: Unknown Android Device
Browser: Chrome Mobile

To secure your account, please verify your identity:
https://google-verify.net/secure-account?token=g47x9

If you don't verify within 24 hours:
• Your account access will be limited
• Your Google Drive files will be locked
• Your Gmail will be temporarily suspended

For enhanced security:
- Review recent activity
- Update your password
- Enable 2-step verification

Google Security Team`,
                clues: [
                    "Suspicious sender domain (not google.com)",
                    "Creates urgency with threats",
                    "Generic security alert",
                    "Suspicious verification link",
                    "Threatens account limitations"
                ],
                isPhishing: true,
                explanation: "This is a phishing attempt. Google only sends security alerts from @google.com. The email uses fear tactics and threatens to limit account access to manipulate users."
            },
            {
                id: 10,
                type: "email",
                sender: "noreply@github.com",
                subject: "GitHub: Confirm your email address",
                content: `Hi @username,

Help us secure your GitHub account by verifying your email address (user@example.com). This lets you:

• Receive notifications
• Recover your account
• Get security alerts
• Use advanced features

Verify Email Address: https://github.com/settings/emails/confirm/abc123

Button not working? Copy and paste this link into your browser:
https://github.com/settings/emails/confirm/abc123

You're receiving this because you recently created a new GitHub account or added a new email address. If this wasn't you, please ignore this email.

Thanks,
The GitHub Team

Note: This is an automated message from GitHub. Replies are neither monitored nor answered.`,
                clues: [
                    "Official GitHub.com domain",
                    "Specific username reference",
                    "Official GitHub URLs",
                    "Clear purpose",
                    "No urgent language"
                ],
                isPhishing: false,
                explanation: "This is a legitimate GitHub email verification request. It uses the official github.com domain, provides clear instructions, and doesn't create artificial urgency."
            }
        ];

        // Return all 10 questions
        return allQuestions;
    }

    getBrandIcon(sender) {
        const domain = sender.split('@')[1].toLowerCase();

        const brandIcons = {
            'netflix.com': '<i class="fab fa-netflix text-red-600 text-2xl"></i>',
            'amazon.com': '<i class="fab fa-amazon text-orange-500 text-2xl"></i>',
            'paypal.com': '<i class="fab fa-paypal text-blue-600 text-2xl"></i>',
            'dropbox.com': '<i class="fab fa-dropbox text-blue-500 text-2xl"></i>',
            'wellsfargo.com': '<i class="fas fa-university text-red-700 text-2xl"></i>',
            'linkedin.com': '<i class="fab fa-linkedin text-blue-700 text-2xl"></i>',
            'apple.com': '<i class="fab fa-apple text-gray-800 text-2xl"></i>',
            'microsoft.com': '<i class="fab fa-microsoft text-blue-600 text-2xl"></i>',
            'google.com': '<i class="fab fa-google text-blue-600 text-2xl"></i>',
            'github.com': '<i class="fab fa-github text-gray-800 text-2xl"></i>'
        };

        // Return default icon if no brand match
        return brandIcons[domain] || `<span class="text-indigo-600 font-bold text-lg">${sender[0].toUpperCase()}</span>`;
    }

    displayCurrentQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        if (!question) return;

        // Enable answer buttons
        document.getElementById('phishing-button').classList.remove('button-disabled');
        document.getElementById('legitimate-button').classList.remove('button-disabled');

        const emailDisplay = document.getElementById('email-display');
        emailDisplay.innerHTML = `
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                            ${this.getBrandIcon(question.sender)}
                        </div>
                        <div>
                            <div class="text-sm text-gray-600">From:</div>
                            <div class="text-base font-medium text-gray-800">${question.sender}</div>
                            <div class="text-sm text-gray-600 mt-1">To: me@example.com</div>
                        </div>
                    </div>
                    <div class="text-sm text-gray-600">
                        ${new Date().toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}
                    </div>
                </div>
                <div class="border-t border-gray-200 pt-4">
                    <div class="text-sm text-gray-600">Subject:</div>
                    <div class="text-base font-medium text-gray-800">${question.subject}</div>
                </div>
            </div>
            <div class="p-6 text-base text-gray-700 leading-relaxed space-y-4 max-h-[400px] overflow-y-auto">
                ${question.content.split('\n\n').map(paragraph =>
            `<p>${paragraph.replace(/\n/g, '<br>')}</p>`
        ).join('')}
            </div>
        `;

        // Clear feedback area
        const feedback = document.getElementById('feedback');
        feedback.classList.add('hidden');
        feedback.innerHTML = '';

        // Update question counter
        const counter = document.getElementById('question-counter');
        if (counter) {
            counter.textContent = `${this.currentQuestionIndex + 1} / ${this.questions.length}`;
        }
    }

    checkAnswer(userAnswer) {
        // Disable answer buttons
        document.getElementById('phishing-button').classList.add('button-disabled');
        document.getElementById('legitimate-button').classList.add('button-disabled');

        const currentQuestion = this.questions[this.currentQuestionIndex];
        const isCorrect = userAnswer === currentQuestion.isPhishing;

        // Update stats
        if (isCorrect) {
            this.stats.correct++;
            this.score += 10;
        } else {
            this.stats.wrong++;
        }
        this.updateStats();

        this.updateScore(isCorrect);
        this.showFeedback(isCorrect, currentQuestion);
    }

    updateScore(isCorrect) {
        const scoreElement = document.getElementById('current-score');

        if (isCorrect) {
            // Add score increase animation
            const oldScore = this.score - 10;
            scoreElement.innerHTML = `<span class="old-score">${oldScore}</span>`;

            // Create and add animation elements
            const animationContainer = document.createElement('div');
            animationContainer.className = 'score-animation';
            animationContainer.innerHTML = `
                <div class="score-increase">+10</div>
                <div class="score-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
            `;
            scoreElement.appendChild(animationContainer);

            // Add success animation classes
            scoreElement.classList.add('score-pulse', 'text-green-600');

            // Update the score after a brief delay
            setTimeout(() => {
                scoreElement.textContent = this.score;
                scoreElement.classList.add('scale-110', 'transform');
            }, 100);

            // Remove animation classes
            setTimeout(() => {
                scoreElement.classList.remove('score-pulse', 'text-green-600', 'scale-110', 'transform');
            }, 600);
        } else {
            // Wrong answer animation
            scoreElement.classList.add('shake', 'text-red-600');

            setTimeout(() => {
                scoreElement.classList.remove('shake', 'text-red-600');
                scoreElement.textContent = this.score;
            }, 500);
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.displayCurrentQuestion();
        } else {
            this.showGameOver();
        }
    }

    showFeedback(isCorrect, question) {
        const feedback = document.getElementById('feedback');
        feedback.classList.remove('hidden');

        const result = isCorrect ? 'Correct!' : 'Wrong!';
        const bgColor = isCorrect ? 'bg-green-50' : 'bg-red-50';
        const textColor = isCorrect ? 'text-green-800' : 'text-red-800';
        const icon = isCorrect
            ? '<svg class="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'
            : '<svg class="w-8 h-8 animate-shake" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';

        const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
        const buttonText = isLastQuestion ? 'Finish Test' : 'Next Question';
        const buttonClass = isLastQuestion ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700';

        feedback.className = `p-6 border-t border-gray-200 ${bgColor} animate-slide-in`;
        feedback.innerHTML = `
            <div class="max-w-3xl mx-auto space-y-6">
                <div class="flex items-center">
                    <div class="w-12 h-12 rounded-full ${isCorrect ? 'bg-green-100 animate-success-pulse' : 'bg-red-100 animate-error-pulse'} flex items-center justify-center mr-4">
                        <span class="${textColor}">${icon}</span>
                    </div>
                    <h3 class="text-2xl font-bold ${textColor} animate-fade-in">${result}</h3>
                </div>
                
                <div class="bg-white rounded-xl p-6 shadow-sm space-y-4">
                    <p class="text-base text-gray-700 animate-fade-in-delay">${question.explanation}</p>
                    
                    <div class="border-t pt-4">
                        <h4 class="text-lg font-semibold mb-3 text-gray-800">Key Clues:</h4>
                        <ul class="space-y-3">
                            ${question.clues.map((clue, index) => `
                                <li class="flex items-center text-base text-gray-700 animate-slide-in-right" style="animation-delay: ${index * 100}ms">
                                    <svg class="w-5 h-5 mr-3 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                    <span>${clue}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>

                <button id="nextButton" class="w-full ${buttonClass} text-white px-6 py-3 rounded-xl button-hover font-medium text-lg flex items-center justify-center transform transition-all duration-200 hover:scale-105">
                    ${buttonText}
                    ${isLastQuestion ? '<svg class="w-6 h-6 ml-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>' : ''}
                </button>
            </div>
        `;

        const nextButton = document.getElementById('nextButton');
        if (isLastQuestion) {
            nextButton.onclick = () => {
                // Save final score to localStorage
                localStorage.setItem('finalScore', this.score);
                // Redirect to protection tips page
                window.location.href = 'protection-tips.html';
            };
        } else {
            nextButton.onclick = () => this.nextQuestion();
        }
    }
} 