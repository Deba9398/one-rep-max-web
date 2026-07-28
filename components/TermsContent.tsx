import { Anchor, Title, Text, Stack } from '@mantine/core';

// Bump when the terms change materially; visitors who accepted an older version are
// asked again. EulaBanner compares the stored value against this.
export const TERMS_VERSION = '2.0';

export const TERMS_EFFECTIVE_DATE = 'July 28, 2026';

export const CONTACT_EMAIL = 'codegardenerllc@gmail.com';

export default function TermsContent() {
  return (
    <Stack gap='sm'>
      <Text size='sm' c='dimmed'>
        Version {TERMS_VERSION} &middot; Effective {TERMS_EFFECTIVE_DATE}
      </Text>

      <Text fw={700}>
        Please read these Terms carefully. They include an assumption of risk, a
        release of claims including claims for ordinary negligence, a limitation
        of liability, and a class action waiver. These provisions affect your
        legal rights.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        1. Acceptance of These Terms
      </Title>
      <Text size='sm'>
        These Terms of Use (this &quot;Agreement&quot;) govern your access to and
        use of the 1 Rep Max Calculator website and web application (the
        &quot;Application&quot;), operated by Code Gardener LLC, a Colorado
        limited liability company (&quot;Code Gardener,&quot; &quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;). By using the Application, or by
        selecting &quot;Got it&quot; on the notice presented to you, you confirm
        that you have had the opportunity to read this Agreement, that you
        understand it, and that you agree to be legally bound by it. The
        Application may store a local record in your browser of the version of
        this Agreement you accepted and the time of acceptance. If you do not
        agree, do not use the Application.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        2. License and Permitted Use
      </Title>
      <Text size='sm'>
        Subject to this Agreement, Code Gardener grants you a limited, personal,
        non-exclusive, non-transferable, non-sublicensable license to access and
        use the Application for your personal, non-commercial purposes. This
        Agreement is a license, not a sale, and no title is transferred to you.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        3. Restrictions
      </Title>
      <Text size='sm'>
        You shall not: (a) copy, modify, adapt, translate, reverse engineer,
        disassemble, decompile, or create derivative works based on the
        Application; (b) sell, rent, lease, transfer, or sublicense access to the
        Application; (c) remove or alter any proprietary notices; (d) use any
        automated means to access the Application in a manner that imposes an
        unreasonable load on it; or (e) use the Application for any unlawful
        purpose.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        4. Released Parties
      </Title>
      <Text size='sm'>
        For purposes of this Agreement, &quot;Released Parties&quot; means Code
        Gardener LLC and its current, former, and future members, managers,
        owners, officers, directors, employees, contractors, agents,
        representatives, licensors, suppliers, service providers, hosting and
        platform providers, affiliates, successors, and assigns.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        5. Fitness, Health, and Medical Disclaimer
      </Title>
      <Text size='sm'>
        THE APPLICATION PROVIDES GENERAL FITNESS AND WELLNESS INFORMATION ONLY.
        IT IS NOT MEDICAL ADVICE, A MEDICAL DEVICE, OR A SUBSTITUTE FOR
        PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, TREATMENT, PHYSICAL THERAPY,
        PERSONAL TRAINING, COACHING, OR SUPERVISION, AND IT DOES NOT DIAGNOSE,
        TREAT, CURE, OR PREVENT ANY DISEASE, CONDITION, INJURY, OR DISABILITY.
        THE APPLICATION IS NOT INTENDED FOR EMERGENCY USE.
      </Text>
      <Text size='sm'>
        Consult a qualified healthcare professional before beginning or changing
        any exercise, weightlifting, diet, or wellness program, especially if you
        have a medical condition, prior injury, pain, dizziness, or shortness of
        breath, are pregnant, take medication, or have been advised to limit
        physical activity. If you believe you are experiencing a medical
        emergency, call 911 or your local emergency number.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        6. Assumption of Risk, Release, and Covenant Not to Sue
      </Title>
      <Text size='sm'>
        WEIGHTLIFTING AND PHYSICAL TRAINING ARE INHERENTLY DANGEROUS ACTIVITIES
        THAT CAN CAUSE PROPERTY DAMAGE, ILLNESS, SERIOUS INJURY, PERMANENT
        DISABILITY, PARALYSIS, OR DEATH. THE APPLICATION MAY PRODUCE ESTIMATES,
        FORMULAS, CHARTS, OR RECORDS THAT ARE INACCURATE, INCOMPLETE, UNSUITABLE
        FOR YOU, OR UNSAFE IF MISUSED. YOU ARE SOLELY RESPONSIBLE FOR YOUR
        EXERCISE DECISIONS, TRAINING LOADS, TECHNIQUE, EQUIPMENT, ENVIRONMENT,
        SPOTTERS, MEDICAL CLEARANCE, AND DECISION TO START, STOP, OR MODIFY ANY
        ACTIVITY.
      </Text>
      <Text size='sm'>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, YOU KNOWINGLY AND
        VOLUNTARILY ASSUME ALL RISKS ARISING OUT OF OR RELATED TO YOUR USE OF THE
        APPLICATION, YOUR RELIANCE ON ANY OUTPUT OF THE APPLICATION, AND ANY
        EXERCISE, FITNESS, OR WEIGHTLIFTING ACTIVITY UNDERTAKEN BASED ON,
        INFORMED BY, OR IN CONNECTION WITH THE APPLICATION. TO THE MAXIMUM EXTENT
        PERMITTED BY APPLICABLE LAW, YOU RELEASE, WAIVE, DISCHARGE, AND COVENANT
        NOT TO SUE THE RELEASED PARTIES FOR ANY CLAIMS, DEMANDS, LOSSES,
        LIABILITIES, DAMAGES, COSTS, OR EXPENSES ARISING OUT OF OR RELATED TO
        YOUR USE OF THE APPLICATION, YOUR RELIANCE ON ANY OUTPUT OF THE
        APPLICATION, OR ANY EXERCISE, FITNESS, OR WEIGHTLIFTING ACTIVITY
        UNDERTAKEN BASED ON, INFORMED BY, OR IN CONNECTION WITH THE APPLICATION,
        INCLUDING CLAIMS FOR PERSONAL INJURY, DEATH, PROPERTY DAMAGE, OR{' '}
        <strong>ORDINARY NEGLIGENCE OF THE RELEASED PARTIES</strong>.
      </Text>
      <Text size='sm'>
        This release applies only to claims you may personally release and does
        not release any claim that applicable law does not permit you to release
        or waive, including claims arising from willful and wanton conduct, gross
        negligence, or fraud.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        7. Accuracy of Estimates
      </Title>
      <Text size='sm'>
        One-repetition maximum formulas are statistical models derived from
        population studies. Individual results vary significantly and may differ
        substantially from any figure shown. The Application presents several
        formulas that frequently disagree with one another, which is itself an
        indication of the uncertainty involved. Do not attempt to lift a weight
        based solely on an estimate provided by the Application, and never
        without proper warm-up, appropriate equipment, competent spotting, and
        professional guidance.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        8. Disclaimer of Warranties and Guarantees
      </Title>
      <Text size='sm'>
        THE APPLICATION IS PROVIDED &quot;AS IS&quot; AND &quot;AS
        AVAILABLE,&quot; WITH ALL FAULTS AND WITHOUT WARRANTY OF ANY KIND. TO THE
        MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE RELEASED PARTIES
        EXPRESSLY DISCLAIM ALL WARRANTIES, EXPRESS, IMPLIED, STATUTORY, OR
        OTHERWISE, INCLUDING WITHOUT LIMITATION: (A) ANY IMPLIED WARRANTY OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR
        NON-INFRINGEMENT; (B) ANY WARRANTY ARISING FROM COURSE OF DEALING, USAGE,
        OR TRADE PRACTICE; (C) ANY WARRANTY THAT THE APPLICATION WILL BE
        UNINTERRUPTED, ERROR-FREE, VIRUS-FREE, SECURE, ACCURATE, COMPLETE,
        RELIABLE, OR THAT DEFECTS WILL BE CORRECTED; AND (D) ANY WARRANTY THAT
        THE APPLICATION OR ANY OUTPUT FROM IT WILL IMPROVE PERFORMANCE, PREVENT
        INJURY, OR BE SAFE OR APPROPRIATE FOR YOU. NO ORAL OR WRITTEN INFORMATION
        GIVEN BY ANY RELEASED PARTY SHALL CREATE ANY WARRANTY. YOU ASSUME ALL
        RISK AS TO THE QUALITY, ACCURACY, AND PERFORMANCE OF THE APPLICATION.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        9. Limitation of Liability
      </Title>
      <Text size='sm'>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE
        RELEASED PARTIES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
        CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES WHATSOEVER, INCLUDING
        WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF
        DATA, LOSS OF GOODWILL, BUSINESS INTERRUPTION, PERSONAL INJURY, DEATH,
        PROPERTY DAMAGE, OR ANY OTHER PECUNIARY OR NON-PECUNIARY LOSS, ARISING
        OUT OF OR RELATED TO THIS AGREEMENT OR YOUR USE OF OR INABILITY TO USE
        THE APPLICATION, EVEN IF A RELEASED PARTY HAS BEEN ADVISED OF THE
        POSSIBILITY OF SUCH DAMAGES AND EVEN IF A REMEDY SET FORTH HEREIN IS
        FOUND TO HAVE FAILED ITS ESSENTIAL PURPOSE.
      </Text>
      <Text size='sm'>
        IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF THE RELEASED PARTIES
        TO YOU FOR ALL DAMAGES, LOSSES, AND CAUSES OF ACTION ARISING OUT OF OR
        RELATING TO THIS AGREEMENT OR THE APPLICATION EXCEED THE GREATER OF: (A)
        THE AMOUNT YOU PAID TO CODE GARDENER LLC FOR THE APPLICATION IN THE
        TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE CLAIM; OR (B) ONE HUNDRED
        U.S. DOLLARS (US $100.00). THIS LIMITATION APPLIES REGARDLESS OF THE FORM
        OF ACTION, WHETHER IN CONTRACT, TORT, STRICT LIABILITY, STATUTE, OR
        OTHERWISE. NOTHING IN THIS AGREEMENT EXCLUDES OR LIMITS LIABILITY THAT
        CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        10. Exclusive Remedy
      </Title>
      <Text size='sm'>
        YOU AGREE THAT YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY DISSATISFACTION
        WITH OR DAMAGE CAUSED BY THE APPLICATION IS TO STOP USING IT. THE
        REMEDIES SET FORTH IN THIS AGREEMENT ARE EXCLUSIVE AND IN LIEU OF ALL
        OTHER REMEDIES AT LAW OR IN EQUITY, EXCEPT FOR REMEDIES THAT CANNOT BE
        WAIVED UNDER APPLICABLE LAW.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        11. Hold Harmless and Indemnification
      </Title>
      <Text size='sm'>
        To the maximum extent permitted by applicable law, you agree to defend,
        indemnify, and hold harmless the Released Parties from and against any
        third-party claims, damages, obligations, losses, liabilities, costs,
        debts, and expenses, including but not limited to attorney&apos;s fees,
        arising from: (a) your unlawful use of the Application; (b) your
        violation of any term of this Agreement; or (c) your violation of any
        third-party right, including without limitation any intellectual
        property right, privacy right, publicity right, or proprietary right.
        This indemnity does not require you to indemnify the Released Parties for
        claims for your own personal injury, death, or property damage to the
        extent such indemnity is prohibited by applicable law.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        12. Intellectual Property
      </Title>
      <Text size='sm'>
        The Application, including all content, features, and functionality, is
        owned by Code Gardener LLC and is protected by United States and
        international copyright, trademark, patent, trade secret, and other
        intellectual property or proprietary rights laws. You receive no rights
        in the Application other than the limited license granted in Section 2.
        All rights not expressly granted are reserved by Code Gardener LLC.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        13. Data, Privacy, and Third-Party Services
      </Title>
      <Text size='sm'>
        Your unit preference, available plate selection, most recent entries, and
        a record of your acceptance of this Agreement are stored locally in your
        browser and are not transmitted to us. The Application uses Google
        Analytics to collect anonymous, aggregated usage information such as page
        views and feature interactions. Your use of the Application is also
        governed by our{' '}
        <Anchor href='/privacy'>
          Privacy Policy
        </Anchor>
        , which is incorporated into this Agreement by reference. If this Agreement conflicts with the Privacy Policy
        regarding personal information, the Privacy Policy controls for that
        issue.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        14. Data Accuracy and Data Loss
      </Title>
      <Text size='sm'>
        You are responsible for reviewing your records, maintaining your own
        backups, and deciding whether any output of the Application is
        appropriate for you. Because your data is stored in your browser, it may
        be lost if you clear your browsing data, use a different browser or
        device, or browse privately. Code Gardener LLC does not guarantee that
        records, calculations, or stored preferences will be accurate, complete,
        preserved, recoverable, uninterrupted, or error-free. You assume all risk
        of data loss, data corruption, inaccurate calculations, and unrecoverable
        records.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        15. Governing Law, Dispute Resolution, and Class Action Waiver
      </Title>
      <Text size='sm'>
        This Agreement shall be governed by and construed in accordance with the
        laws of the State of Colorado, United States of America, without regard
        to its conflict of law provisions.
      </Text>
      <Text size='sm'>
        Before starting any legal proceeding, you agree to first notify Code
        Gardener LLC in writing, by email to {CONTACT_EMAIL}, with a description
        of your dispute, and to allow at least thirty (30) days for the parties
        to try to resolve it informally. Many disputes can be resolved this way
        without the need for litigation.
      </Text>
      <Text size='sm'>
        Any dispute arising out of or relating to this Agreement that is not
        resolved informally shall be resolved exclusively in the state or federal
        courts located in Colorado, and you hereby irrevocably consent to
        personal jurisdiction and venue in such courts. Either party may instead
        resolve a qualifying individual dispute in small claims court.
      </Text>
      <Text size='sm'>
        YOU AND CODE GARDENER LLC AGREE THAT EACH MAY BRING CLAIMS AGAINST THE
        OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR
        CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, PRIVATE ATTORNEY
        GENERAL, OR REPRESENTATIVE PROCEEDING.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        16. Severability and No Waiver
      </Title>
      <Text size='sm'>
        If any provision of this Agreement is found to be invalid or
        unenforceable, that provision shall be modified to the minimum extent
        necessary to make it enforceable, or severed if it cannot be, and the
        remaining provisions shall remain in full force and effect. No waiver of
        any term shall be deemed a further or continuing waiver of that term or
        any other term.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        17. Termination
      </Title>
      <Text size='sm'>
        This Agreement is effective until terminated. Your rights under this
        Agreement will terminate automatically and immediately without notice if
        you fail to comply with any of its terms. Upon termination you must cease
        all use of the Application. Sections 4 through 16 and Section 18 shall
        survive termination.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        18. Age Requirements
      </Title>
      <Text size='sm'>
        By using the Application, you represent and warrant that you are at least
        18 years of age. If you are under 18, do not use the Application.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        19. Entire Agreement and Updates
      </Title>
      <Text size='sm'>
        This Agreement, together with our{' '}
        <Anchor href='/privacy'>
          Privacy Policy
        </Anchor>
        , constitutes the entire agreement between you and Code Gardener LLC with respect to the
        Application and supersedes all prior or contemporaneous understandings,
        agreements, representations, and warranties. Code Gardener LLC reserves
        the right to update this Agreement. Material changes will be reflected in
        a new version number and effective date above and may require renewed
        acceptance. Continued use of the Application after notice of changes
        constitutes acceptance of the revised Agreement.
      </Text>

      <Title order={3} size='h5' mt='xs'>
        20. Contact
      </Title>
      <Text size='sm'>
        Questions about this Agreement may be sent to {CONTACT_EMAIL}.
      </Text>
    </Stack>
  );
}
