import React from 'react'
import FAQ from './FAQ'
import { Typography } from 'antd'
export default function FAQs() {
  const FAQItems1 = [
    {
      key: '1',
      label: <Typography.Title level={5}>How do I book China train tickets?</Typography.Title>,
      children: (
        <div
          style={{
            paddingInlineStart: 24,
          }}
        >
          <p>To book train tickets, please follow these steps:</p>
          <p>
            {' '}
            <Typography.Text type="secondary">
              <strong>Step 1:</strong> Select departure and arrival stations
            </Typography.Text>
          </p>
          <p>
            <Typography.Text type="secondary">
              <strong>Step 2: </strong>Select departure date
            </Typography.Text>
          </p>
          <p>
            {' '}
            <Typography.Text type="secondary">
              <strong>Step 3:</strong> If you want to book a return ticket, select the return date
            </Typography.Text>
          </p>
          <p>
            {' '}
            <Typography.Text type="secondary">
              <strong>Step 4:</strong> Choose the most suitable train from the list and confirm your
              desired seat class
            </Typography.Text>
          </p>
          <p>
            {' '}
            <Typography.Text type="secondary">
              <strong>Step 5:</strong> Enter passenger and contact information
            </Typography.Text>
          </p>
          <p>
            {' '}
            <Typography.Text type="secondary">
              <strong>Step 6:</strong> Choose payment method
            </Typography.Text>
          </p>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <Typography.Title level={5}>
          How do I pick up China high-speed train tickets?
        </Typography.Title>
      ),
      children: (
        <div
          style={{
            paddingInlineStart: 24,
          }}
        >
          <p>
            <Typography.Text type="secondary">
              If the ID document used for booking your ticket is a passport, Mainland Travel Permit
              for Hong Kong and Macau Residents, Mainland Travel Permit for Taiwan Residents,
              Residence Permit for Hong Kong, Macau, and Taiwan Residents, or PRC Foreign Permanent
              Resident ID Card, please use the manually staffed channel to enter and exit the
              station. If the ID document used for ticket booking is a mainland Chinese ID card, you
              can directly swipe your ID card to enter and exit the station.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              In case of any issues, you can show your ticket pick-up number to the staff (which can
              be found on your train ticket booking details page).
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              China Railway and Hong Kong cross-boundary trains have fully implemented e-tickets,
              and paper tickets are not required for both adult and child tickets.
            </Typography.Text>
          </p>
        </div>
      ),
    },
  ]

  const FAQItems2 = [
    {
      key: '1',
      label: (
        <Typography.Title level={5}>
          How do I take Hong Kong cross-boundary high-speed trains?
        </Typography.Title>
      ),
      children: (
        <div
          style={{
            paddingInlineStart: 24,
          }}
        >
          <p>
            <Typography.Text type="secondary">
              To take the train, please follow these steps:
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              1. Real-name Authentication and Ticket Check-in
              <br />
              Go to the ticket hall on floor B1 and complete the real-name verification and ticket
              check-in process through the self-service gates or staff-assisted counters.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              2. Security Check Procedure
              <br />
              Follow the instructions to complete baggage and security checks.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              3. Customs Clearance Procedure
              <br />
              Go to the departure hall on floor B3 to complete immigration procedures for Hong Kong
              and mainland China.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              4. Boarding
              <br />
              Go to the ticket gate for the train on floor B3, and present your ID document to enter
              the gate and board the train. The gate will open 15 minutes before departure and close
              5 minutes before departure.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              5. Arrival at Mainland Chinese Stations
              <br />
              Use the ID document used for ticket booking to exit the gate.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              On the day of taking the high-speed train, passengers can complete the real-name
              verification, security check, customs clearance, and boarding procedures as early as
              120 minutes before the train departs, with the process taking about 30–45 minutes at
              the fastest.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              Additional time is required for travel on weekends, holidays, or during summer
              vacation, or for passengers using passports or who need to use the exit inspection
              counter.
            </Typography.Text>
          </p>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <Typography.Title level={5}>
          How do I change Hong Kong cross-boundary high-speed train tickets?
        </Typography.Title>
      ),
      children: (
        <div
          style={{
            paddingInlineStart: 24,
          }}
        >
          <p>
            <Typography.Text type="secondary">
              Once the train ticket has been changed successfully, it cannot be refunded.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              Passengers can only make one ticket change, and departure and arrival stations cannot
              be changed.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              If the price of the new ticket is higher than the original ticket price, the new
              ticket price must be paid in full, and the original ticket price will be refunded once
              the new ticket has been issued successfully. If the new ticket price is lower than the
              original ticket price, the difference will be refunded. A change fee of CNY 15 per
              person will be charged.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              For details, please refer to the ticket policy.
            </Typography.Text>
          </p>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <Typography.Title level={5}>
          How do I get a refund for Hong Kong cross-boundary high-speed train tickets?
        </Typography.Title>
      ),
      children: (
        <div
          style={{
            paddingInlineStart: 24,
          }}
        >
          <p>
            <Typography.Text type="secondary">
              Refunds should be processed no later than 30 minutes before the ticket's designated
              date and departure time. For tickets with Hong Kong West Kowloon Station as the
              departure or arrival station, refunds should be processed no later than 45 minutes
              before departure.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              Tickets that have been successfully changed cannot be refunded.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              For details, please refer to the ticket policy.
            </Typography.Text>
          </p>
        </div>
      ),
    },
  ]

  const FAQItems3 = [
    {
      key: '1',
      label: (
        <Typography.Title level={5}>
          How do I take Chinese mainland high-speed trains?
        </Typography.Title>
      ),
      children: (
        <div
          style={{
            paddingInlineStart: 24,
          }}
        >
          <p>
            <Typography.Text type="secondary">
              To take the train, please follow these steps:
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              <strong>1. Enter the station</strong>
              <br />
              Show the valid ID used when booking the ticket to station staff to enter the station.
              Valid ID types include passport, mainland Chinese ID card, Mainland Travel Permit for
              Hong Kong and Macau Residents, Mainland Travel Permit for Taiwan Residents, Residence
              Permit for Hong Kong, Macau, and Taiwan Residents, and PRC Foreign Permanent Resident
              ID Card. If required, you may need to show the relevant booking information.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              <strong>2. Find your gate</strong>
              <br />
              Find the gate for your train on the electronic screen in the station. Head to the area
              near your gate and wait for boarding to begin.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              <strong>3. Go through the ticket gates</strong>
              <br />
              If you booked e-tickets, information about the train station will be linked to your
              valid ID (such as passport, mainland China ID card, Mainland Travel Permit for Hong
              Kong and Macau Residents, Mainland Travel Permit for Taiwan Residents, Residence
              Permit for Hong Kong, Macau, and Taiwan Residents, and PRC Foreign Permanent Resident
              ID Card). When entering the gate, please show your ID to the attendant. On the
              platform, we recommend asking the attendant the correct boarding location for your
              car.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              <strong>4. Boarding</strong>
              <br />
              Refer to the car and seat number on your booking details and find your seat.
            </Typography.Text>
          </p>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <Typography.Title level={5}>
          How do I change Chinese mainland high-speed train tickets?
        </Typography.Title>
      ),
      children: (
        <div
          style={{
            paddingInlineStart: 24,
          }}
        >
          <p>
            <Typography.Text type="secondary">
              <strong>What can be changed:</strong>
              <br />
              Departure date, train number, seat class, and arrival station. Please note that
              according to Railway Administration regulations, you can only change the arrival
              station 48 hours or more prior to departure. Changes cannot be made within 48 hours.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              <strong>What cannot be changed:</strong>
              <br />
              Departure station (except for intra-city stations), name, ID document, ID document
              type, etc. If there is a name error on your ticket, it cannot be modified through
              ticket changes.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              Each ticket can only be changed once. Once a ticket has been successfully changed, it
              cannot be changed again.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              Tickets that have been printed for reimbursement and purchased using cash payment can
              only be changed at a station ticket window, and you will need to return your paper
              ticket.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              If your ticket has been issued directly from 12306 China Railway, you cannot make
              changes between 23:30 each Tuesday and 05:00 the next day. Change requests submitted
              during this time will be processed after 05:00 on Wednesday.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              If the price of the new ticket is higher than the original ticket price, the new
              ticket price must be paid in full, and the original ticket price will be refunded once
              the new ticket has been issued successfully. If the new ticket price is lower than the
              original ticket price, the difference will be refunded. A change fee of CNY 15 per
              person will be charged. For change fees and other details, please refer to the ticket
              policy.
            </Typography.Text>
          </p>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <Typography.Title level={5}>
          How do I get a refund for Mainland China high-speed train tickets?
        </Typography.Title>
      ),
      children: (
        <div
          style={{
            paddingInlineStart: 24,
          }}
        >
          <p>
            <Typography.Text type="secondary">
              <strong>Before departure:</strong>
              <br />
              You can request a ticket refund on the Goticket app.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              <strong>After departure:</strong>
              <br />
              Tickets cannot be refunded. On the day of departure, you can change to another train
              on the same day for free, or you can change to a future train. If no changes are made
              on the day of departure, the ticket will become void.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              <strong>If you already have a paper ticket for reimbursement:</strong>
              <br />
              You can first request a ticket refund on the Goticket app and then, within 180 days,
              bring your original ID used at the time of booking to the station ticket window to
              complete the refund process and return your paper ticket for reimbursement. Only then
              can the Railway Authority issue a refund.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              If your ticket was issued by a manual assistant, Goticket will charge a CNY 15 manual
              change fee per person. If your ticket was directly issued from the official 12306
              China Railway website, no manual change fee will be charged.
            </Typography.Text>
          </p>
        </div>
      ),
    },
  ]

  const FAQItems4 = [
    {
      key: '1',
      label: (
        <Typography.Title level={5}>
          How do I transfer to another high-speed train?
        </Typography.Title>
      ),
      children: (
        <div
          style={{
            paddingInlineStart: 24,
          }}
        >
          <p>
            <Typography.Text type="secondary">
              If you have a long transfer duration, after getting off your train, you may want to
              ask station staff whether there's a way to directly access the waiting area for your
              connecting train. If there isn't, you'll need to exit and re-enter the station.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              If the transfer duration is short, after getting off at the transfer station, we
              recommend asking station staff how to get to the platform for your connecting train.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              If you are unable to make your connecting train because the first train on your
              itinerary was delayed, you can change your ticket to another train departing on the
              same day before 23:59. If you're unable to change your ticket, please go to a station
              ticket window and request a refund. Generally, there won't be a fee for doing this,
              but policies vary by station, and Goticket cannot accept liability in the event you
              are charged.
            </Typography.Text>
          </p>
          <br />
          <p>
            <Typography.Text type="secondary">
              If passengers incur ticket-related losses due to uncontrollable factors, Goticket
              cannot accept liability.
            </Typography.Text>
          </p>
        </div>
      ),
    },
  ]
  return (
    <div>
      <div className="flex justify-center mt-11">
        <div className="pb-8 font-bold w-4/5 ">
          <Typography.Title level={1}>China High-speed Train FAQ</Typography.Title>
          <Typography.Title level={3}>Ticket Booking and Pick-up</Typography.Title>
          <FAQ items={FAQItems1} />
          <Typography.Title level={3} className="mt-7">
            Hong Kong Cross-boundary High-speed Trains
          </Typography.Title>
          <FAQ items={FAQItems2} />
          <Typography.Title level={3} className="mt-7">
            Chinese Mainland High-speed Trains
          </Typography.Title>
          <FAQ items={FAQItems3} />
          <Typography.Title level={3} className="mt-7">
            Transfer
          </Typography.Title>
          <FAQ items={FAQItems4} />
        </div>
      </div>
    </div>
  )
}

