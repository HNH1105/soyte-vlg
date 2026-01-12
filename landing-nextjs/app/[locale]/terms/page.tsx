'use client';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-6">Effective Date: March 19, 2024</p>
        <p className="text-gray-600 mb-8">Last Updated: March 19, 2024</p>

        <p className="mb-8">
          Welcome to ZapplyAI ("Zapply", "we", "our", or "us"). These Terms of Service ("Terms") govern your use of our website, web app, and services (the "Services"). By accessing or using ZapplyAI, you agree to these Terms. If you do not agree, do not use our Services.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. WHO MAY USE ZAPPLY</h2>
          <p>You may use ZapplyAI only if you:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Are at least 18 years old</li>
            <li>Can form a legally binding contract</li>
            <li>Are not barred from using the Services under applicable law</li>
          </ul>
          <p>You represent and warrant that you meet all of the above eligibility requirements.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. ACCOUNT REGISTRATION</h2>
          <p>To use certain features, you may need to create an account. You agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide accurate and complete information</li>
            <li>Keep your login credentials secure</li>
            <li>Notify us immediately of any unauthorized access</li>
          </ul>
          <p>We reserve the right to suspend or terminate your account for violations of these Terms.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. SERVICES DESCRIPTION</h2>
          <p>ZapplyAI provides AI-powered tools to help you generate personalized CVs, cover letters, and job applications. The Services may include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Resume parsing and optimization</li>
            <li>Job ad analysis and skill matching</li>
            <li>Document generation based on AI algorithms</li>
            <li>Optional expert review or editing</li>
          </ul>
          <p>We do not guarantee that using our Services will result in job offers or employment.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. USER CONTENT</h2>
          <p>You retain ownership of the content you upload (e.g. resumes, cover letters). By uploading, you grant ZapplyAI a limited license to use, store, and process this content solely to provide and improve the Services.</p>
          <p className="mt-4">You must not upload:</p>
          <ul className="list-disc pl-6">
            <li>Inaccurate, unlawful, or misleading content</li>
            <li>Confidential or proprietary information you don't own</li>
            <li>Any material that violates intellectual property rights</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. PAYMENTS AND SUBSCRIPTIONS</h2>
          <p>Some features require payment. When subscribing, you agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Pay the applicable fees</li>
            <li>Accept recurring billing unless cancelled</li>
            <li>Cancel anytime via your account dashboard</li>
          </ul>
          <p>Prices are subject to change with reasonable notice.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. ACCEPTABLE USE</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use ZapplyAI for illegal or deceptive purposes</li>
            <li>Interfere with or disrupt our systems</li>
            <li>Reverse engineer or attempt to extract source code</li>
            <li>Use automated bots to abuse the Services</li>
          </ul>
          <p>We reserve the right to suspend or ban accounts that violate this section.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. DISCLAIMER</h2>
          <p>ZapplyAI is provided "as is" and "as available." We do not make guarantees about:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Job placement or success rates</li>
            <li>Availability of the Services at all times</li>
            <li>Freedom from errors, interruptions, or data loss</li>
          </ul>
          <p>You assume all responsibility for using the platform and outcomes.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. LIMITATION OF LIABILITY</h2>
          <p>To the fullest extent permitted by law:</p>
          <ul className="list-disc pl-6">
            <li>We are not liable for indirect, incidental, or consequential damages</li>
            <li>Our total liability will not exceed the amount you paid us in the 12 months prior to the claim</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. TERMINATION</h2>
          <p>You may delete your account at any time. We may suspend or terminate your access if you violate these Terms or misuse the platform.</p>
          <p className="mt-4">Upon termination, your right to access the Services ends. We may retain your data as permitted by law.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. PRIVACY</h2>
          <p>Use of the Services is governed by our Privacy Policy, which explains how we handle your personal data in compliance with GDPR and other data protection laws.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. GOVERNING LAW</h2>
          <p>These Terms are governed by the laws of Germany, and any disputes will be resolved in the courts of Berlin, unless otherwise required by law.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. CHANGES TO THESE TERMS</h2>
          <p>We may revise these Terms from time to time. We'll notify you of major changes. Continued use after changes means you accept the new Terms.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. CONTACT</h2>
          <p>If you have any questions about these Terms, contact us at:</p>
          <ul className="list-none pl-6">
            <li>Email: zapplyai@gmail.com</li>
            <li>Address: Wolfsberger Str. 11, 12623 Berlin, Germany</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 