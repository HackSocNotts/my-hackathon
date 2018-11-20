import { Request, Response } from 'firebase-functions';
import { firestore as DB } from 'firebase-admin';
import { Parser } from 'json2csv';

const db = DB();

interface CSVAttendeeModel {
  'id': string;
  'Name': string;
  'Email': string;
  'Phone': string;
  'Date of Birth': string;
  'Gender': string;
  'School': string;
  'Level of Study': string;
  'Graduation Year': string;
  'Major': string;
  'Shrirt Size': string;
  'Dietary Restrictions': string;
  'Special Needs': string;
  'MLH Code of Conduct': boolean;
  'MLH Privacy Policy': boolean;
  'MLH Terms and Conditions': boolean;
  'Share Data with MLH': boolean;
  'MLH Marketting': boolean;
};

interface DropdownOptionModel {
  label: string;
  value: string;
};

interface AttendeeModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  school: DropdownOptionModel;
  major: string;
  levelOfStudy: string;
  graduation: string;
  gender: DropdownOptionModel;
  ethnicity: DropdownOptionModel;
  dietaryRestrictions: DropdownOptionModel;
  shirtSize: DropdownOptionModel;
  specialNeeds: string;
  mlhCoC: boolean;
  mlhPrivacy: boolean;
  mlhContest: boolean;
  mlhSharring: boolean;
  mlhMarketting: boolean;
  status: 'SUBMITTED' | 'INCOMPLETE';
}

const getAttendees = (): Promise<AttendeeModel[]>  => {
  return db.collection('applications').where('status', '==', 'SUBMITTED').get()
    .then(snapshot => snapshot.docs)
    // .then(docs => console.log(docs)) as Promise<any> as Promise<AttendeeModel[]>;
    .then(docs => docs.map(doc => doc.data() as AttendeeModel));
};

const convertAttendees = (attendees: AttendeeModel[], converted: CSVAttendeeModel[] = []): CSVAttendeeModel[] => {
  if (attendees.length === 0 && converted.length === 0) {
    throw Error('no attendees');
  } else if (attendees.length === 0) {
    return converted;
  } else {
    const attendee = attendees.shift();
    const convertedAttendee: CSVAttendeeModel = {
      'id': attendee.id,
      'Name': attendee.name,
      'Email': attendee.email,
      'Phone': attendee.phone,
      'Date of Birth': attendee.birthdate,
      'Gender': attendee.gender.value,
      'School': attendee.school.value,
      'Level of Study': attendee.levelOfStudy,
      'Graduation Year': attendee.graduation,
      'Major': attendee.major,
      'Shrirt Size': attendee.shirtSize.value,
      'Dietary Restrictions': attendee.dietaryRestrictions.value,
      'Special Needs': attendee.specialNeeds,
      'MLH Code of Conduct': attendee.mlhCoC,
      'MLH Privacy Policy': attendee.mlhPrivacy,
      'MLH Terms and Conditions': attendee.mlhContest,
      'Share Data with MLH': attendee.mlhSharring,
      'MLH Marketting': attendee.mlhMarketting,
    };
    return convertAttendees(attendees, [...converted, convertedAttendee])
  }
}

const attendeses2CSV = async (req: Request, res: Response): Promise<Response> => {
  // try {
    const attendees = await getAttendees();
    const fields =[
      'id',
      'Name',
      'Email',
      'Phone',
      'Date of Birth',
      'Gender',
      'School',
      'Level of Study',
      'Graduation Year',
      'Major',
      'Shrirt Size',
      'Dietary Restrictions',
      'Special Needs',
      'MLH Code of Conduct',
      'MLH Privacy Policy',
      'MLH Terms and Conditions',
      'Share Data with MLH',
      'MLH Marketting'
    ];

    const parsedAttendees: CSVAttendeeModel[] = convertAttendees(attendees);

    const parser = new Parser({fields});
    const parsed = parser.parse(parsedAttendees);

    res.set('content-type', 'text/csv');
    return res.send(parsed);
  // } catch (error) {
    // console.error(error);
    // return res.status(500).json({
    //   message: error.message,
    //   code: error.code,
    // });
  // }
};

export default attendeses2CSV;
