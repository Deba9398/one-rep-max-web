import { Title, Text, Stack } from '@mantine/core';

// Bump when the terms change materially; visitors who accepted an older version are
// asked again. EulaBanner compares the stored value against this.
export const TERMS_VERSION = '2.0';

export const TERMS_EFFECTIVE_DATE = 'July 28, 2026';

export default function TermsContent() {
  return (
    <Stack gap='sm'>
      <Text size='sm' c='dimmed'>
        Effective {TERMS_EFFECTIVE_DATE}
      </Text>

      <Text fw={700}>
        Please read these Terms carefully. They include an assumption of risk, a
        release of claims, and a limitation of liability that affect your legal
        rights.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        1. Acceptance of These Terms
      </Title>
      <Text size='sm'>
        By accessing or using the 1 Rep Max Calculator (the
        &quot;Application&quot;), you agree to be bound by these Terms of Use. If
        you do not agree to these Terms, do not use the Application. These Terms
        form a binding agreement between you and [LEGAL ENTITY NAME]
        (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
      </Text>

      <Title order={3} size='h5' mt='xs'>
        2. Eligibility
      </Title>
      <Text size='sm'>
        The Application is intended for individuals 18 years of age or older. If
        you are between 13 and 17, you may use the Application only with the
        consent and supervision of a parent or legal guardian who agrees to be
        bound by these Terms on your behalf. The Application is not directed to
        children under 13, and we do not knowingly collect personal information
        from them.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        3. For Informational Purposes Only
      </Title>
      <Text size='sm'>
        The Application provides one-repetition maximum (1RM) estimates solely
        for general informational and educational purposes. All results are
        mathematical estimates derived from publicly available formulas. They are
        not measurements, predictions, or guarantees of your actual physical
        capability, and they are not tailored to you as an individual.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        4. Not Medical or Professional Advice
      </Title>
      <Text size='sm'>
        Nothing in the Application constitutes medical, health, fitness,
        nutritional, rehabilitative, or professional training advice. Use of the
        Application does not create any professional relationship between you and
        us, including any physician-patient, trainer-client, or advisory
        relationship. Never disregard professional advice, or delay seeking it,
        because of something you read or calculated here.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        5. Consult a Physician Before Training
      </Title>
      <Text size='sm'>
        Consult a qualified healthcare provider before beginning, resuming, or
        modifying any exercise program, and particularly before attempting any
        maximal or near-maximal lift. This is especially important if you have or
        suspect any cardiovascular condition, musculoskeletal injury, joint
        instability, hernia, or high blood pressure, if you are pregnant or
        postpartum, or if you are returning from illness or injury. Stop
        exercising immediately and seek medical attention if you experience chest
        pain, pressure or tightness, dizziness, faintness, unusual shortness of
        breath, or sharp or sudden pain. If you believe you are experiencing a
        medical emergency, call 911 or your local emergency number.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        6. Assumption of Risk
      </Title>
      <Text size='sm'>
        Weightlifting and resistance training carry inherent and significant
        risks, including but not limited to muscle strains and tears, joint and
        connective tissue injuries, spinal injury, crush injuries from dropped or
        failed lifts, cardiovascular events, permanent disability, and death.
        These risks increase substantially when attempting maximal or
        near-maximal loads. By using the Application, you knowingly, voluntarily,
        and expressly assume all such risks, whether known or unknown, and
        acknowledge that you alone are responsible for your training decisions,
        your technique, your equipment, your supervision and spotting
        arrangements, and your physical safety.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        7. Waiver and Release of Claims
      </Title>
      <Text size='sm'>
        To the fullest extent permitted by Colorado law, you waive, release, and
        forever discharge us and our owners, members, officers, employees,
        contractors, and agents from any and all claims, demands, causes of
        action, damages, losses, costs, and expenses of any kind arising out of
        or relating to your use of the Application or any estimate it provides,
        including any claim for personal injury, property damage, or death. You
        expressly acknowledge and agree that this release{' '}
        <strong>includes claims arising from our own negligence</strong>, and
        that you have read and understood this provision and enter into it freely
        and voluntarily.
      </Text>
      <Text size='sm'>
        This release does not apply to, and nothing in these Terms attempts to
        release, any claim arising from willful and wanton conduct, gross
        negligence, fraud, or any other liability that may not lawfully be
        released or limited under Colorado law.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        8. Accuracy of Estimates
      </Title>
      <Text size='sm'>
        1RM formulas are statistical models derived from population studies.
        Individual results vary significantly and may differ substantially from
        any figure shown. The Application presents several formulas that
        frequently disagree with one another, which is itself an indication of
        the uncertainty involved. Do not attempt to lift a weight based solely on
        an estimate provided by the Application, and never without proper
        warm-up, appropriate equipment, competent spotting, and professional
        guidance.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        9. No Warranty
      </Title>
      <Text size='sm'>
        The Application is provided &quot;as is&quot; and &quot;as
        available,&quot; without warranty of any kind, whether express, implied,
        or statutory. To the fullest extent permitted by law, we disclaim all
        warranties, including any implied warranties of merchantability, fitness
        for a particular purpose, accuracy, and non-infringement. We do not
        warrant that the Application will be uninterrupted or error-free, or that
        any calculation it produces will be correct.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        10. Limitation of Liability
      </Title>
      <Text size='sm'>
        To the fullest extent permitted by applicable law, we shall not be liable
        for any indirect, incidental, special, consequential, exemplary, or
        punitive damages, or for any loss of profits, data, goodwill, or
        anticipated savings, arising out of or relating to the Application,
        regardless of the theory of liability and even if we have been advised of
        the possibility of such damages.
      </Text>
      <Text size='sm'>
        Our total aggregate liability for all claims relating to the Application
        shall not exceed the greater of (a) the total amount you paid us to use
        the Application during the twelve months preceding the event giving rise
        to the claim, or (b) one hundred United States dollars ($100.00). You
        acknowledge that the Application is provided free of charge and that this
        allocation of risk is a fundamental basis of the agreement between us.
      </Text>
      <Text size='sm'>
        Some jurisdictions do not permit the exclusion or limitation of certain
        damages. In those jurisdictions, our liability is limited to the greatest
        extent permitted by law.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        11. Indemnification
      </Title>
      <Text size='sm'>
        You agree to indemnify, defend, and hold harmless us and our owners,
        members, officers, employees, contractors, and agents from and against
        any claims, liabilities, damages, judgments, awards, losses, costs, and
        expenses, including reasonable attorney fees, arising out of or relating
        to your use or misuse of the Application, your violation of these Terms,
        or your violation of any law or the rights of any third party.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        12. Third-Party Links and Content
      </Title>
      <Text size='sm'>
        The Application may link to third-party websites or resources. Those
        links are provided for convenience only. We do not control, endorse, or
        assume responsibility for any third-party content, products, services, or
        privacy practices, and we are not liable for any loss or damage arising
        from your use of them.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        13. Your Data
      </Title>
      <Text size='sm'>
        Your unit preference, plate selection, and most recent entries are stored
        locally in your browser and are not transmitted to us. The Application
        uses Google Analytics to collect anonymous, aggregated usage information
        such as page views and feature interactions. Our handling of information
        is described in our Privacy Policy, which is incorporated into these
        Terms by reference.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        14. Changes to These Terms
      </Title>
      <Text size='sm'>
        We may update these Terms from time to time. When we make a material
        change, we will revise the version and effective date shown above and ask
        you to accept the revised Terms. Your continued use of the Application
        after a revision takes effect constitutes acceptance of the revised
        Terms. If you do not agree to a revision, you must stop using the
        Application.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        15. Governing Law and Venue
      </Title>
      <Text size='sm'>
        These Terms are governed by the laws of the State of Colorado, without
        regard to its conflict of law principles. You agree that any action or
        proceeding arising out of or relating to these Terms or the Application
        shall be brought exclusively in the state or federal courts located in
        [COUNTY] County, Colorado, and you consent to the personal jurisdiction
        of those courts and waive any objection to venue there.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        16. Severability and No Waiver
      </Title>
      <Text size='sm'>
        If any provision of these Terms is held invalid or unenforceable, that
        provision shall be modified to the minimum extent necessary to make it
        enforceable, or severed if it cannot be, and the remaining provisions
        shall continue in full force and effect. Our failure to enforce any
        provision is not a waiver of our right to enforce it later.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        17. Entire Agreement
      </Title>
      <Text size='sm'>
        These Terms, together with our Privacy Policy, constitute the entire
        agreement between you and us regarding the Application and supersede any
        prior understanding on that subject.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        18. Contact
      </Title>
      <Text size='sm'>
        Questions about these Terms may be sent to [CONTACT EMAIL].
      </Text>
    </Stack>
  );
}
