export interface ConfigJson {
    innovationDayConfigs: InnovationDayConfigObject,
    registrationFormConfigs: RegistrationFormConfig
}

interface InnovationDayConfigObject  {
    maxSize: number;
    maxWordCount: number;
}

interface RegistrationFormConfig {
    eventNames: Array<EventNamesObject>
}

export interface EventNamesObject {
    name: string,
    isSelected: boolean
}

export interface InnovationDayFormObject {
    teamName: string,
    teamSize: number,
    gistOfIdea: string,
    secretKey: string,
    teamMembersDetails: Array<TeamMembersObj>;
    createdDateAndTime: string;
    lastUpdatedDateAndTime: string;
    location: string;
    submissionMode: string;
}

interface TeamMembersObj {
    emailId: string
}