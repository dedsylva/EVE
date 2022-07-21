import React from "react";
import { Text, View, Button, ScrollView } from "react-native";
import about from "../styles/aboutStyles";

export default function Daily () {
  return (
    <View style={about.aboutContainer}>
      <Text style={about.aboutSubTitle}>Health APP</Text>

      <ScrollView>
        <Text style={about.aboutNormalText}>Health APP is an App designed by Tadeu, with the intention of showing the possibiilities of current technology towards HealthCare.</Text>
        <Text style={about.aboutBoldText}> This APP has no intention to be comercialized.</Text>
        <Text style={about.aboutNormalText}> Healthcare has become one of the most important problems of our society, and one way to resolve it is by making things cheap.</Text>
        <Text style={about.aboutNormalText}>In order to do that, we need to start implementing what has been called "Home Testing" and "HealthDataCare".</Text>
        <Text style={about.aboutNormalText}>The concept is simple: instead of making people pay (when they can) and wait in a long line for exams, we make tests at home.</Text>
        <Text style={about.aboutNormalText}>Cheap tests. Current there is a few applications that HealthCare already can take benefits from. They are called</Text>
        <Text style={about.aboutBoldText}>Simple Daily Data:</Text>
        <Text style={about.aboutNormalText}>    - Those are the data that can already be taken from home. For example: Weight Measures, Blood Pressure, Heart Rate, etc.</Text>
        <Text style={about.aboutNormalText}>But we can go further and enable a new class of exams: Cancer Exams. This is a sensitive topic, but it has a lot of potential.</Text>
        <Text style={about.aboutNormalText}>Imagine if you can make a quick and simple test at home and know in a couple minutes the likelihood that you have cancer.</Text>
        <Text style={about.aboutNormalText}>This is already possible with at least two types: Skin Cancer and Breast Cancer.</Text>
        <Text style={about.aboutBoldText}>Skin Cancer</Text>
        <Text style={about.aboutNormalText}>    - The way to do it is pretty simple, and it is implemented with this app. You just take a picture, fill some informations</Text>
        <Text style={about.aboutNormalText}>about the image (your age, sex, location of the photo taken) and we have about 92% of precision in less than a minute.</Text>
        <Text style={about.aboutNormalText}>There are ways to improve this results, if you use a dermatology photo </Text>
        <Text style={about.aboutNormalText}>(one way implemented by the Health DedsBot is by having a microscopic).</Text>
        <Text style={about.aboutBoldText}>Breast Cancer</Text>
        <Text style={about.aboutNormalText}>    - This is a little more tricky. The software is done, and it works similarly to the Skin Cancer.</Text>
        <Text style={about.aboutNormalText}>You simply present the image to the model and it does the inference.</Text>
        <Text style={about.aboutNormalText}>But the best way of taking "picture" is with a ultrassonic transducer, which are (currently) too expensive.</Text>
        <Text style={about.aboutNormalText}>What we need to do is to redesign the ultrassonic transducer, making it more easy and reliable for common people to use, </Text>
        <Text style={about.aboutNormalText}>and be able to make the test at home.</Text>
        <Text style={about.aboutBoldSubText}>Disclaimer </Text>
        <Text style={about.aboutNormalText}>It is important to note that this does not mean that you are not going to need a doctor. This is just a pre-test that </Text>
        <Text style={about.aboutBoldText}>will need to be confirmed (or not) by a medical professional. </Text>
        <Text style={about.aboutNormalText}>The point here is not to replace Doctors, but instead help them providing more data, and making easier for common </Text>
        <Text style={about.aboutNormalText}>people to have diagnostics faster and cheaper.</Text>
        <Text style={about.aboutNormalText}>While in that note, talking about sharing data to doctors, this is the other pillar that this app is based on. Its time that the pacient</Text>
        <Text style={about.aboutNormalText}>has control over their entire Medical History, since the day he/she were born. No more retaking tests because they were made </Text>
        <Text style={about.aboutNormalText}>by another Private Hospital (obligating people to pay for another exam). If you have the data, the doctor can make the diagnose </Text>
        <Text style={about.aboutNormalText}>better and more precisely (imagine two scenarios: pacient A comes to doctor not feeling good for a few days, and pacient B who is </Text>
        <Text style={about.aboutNormalText}>suffering the same syntoms, but has their Medical History available and Daily/Weekly data of their Health Status. </Text>
        <Text style={about.aboutNormalText}>The doctor can then study those informations and make a more conscious decision with the last pacient).</Text>


        <Text style={about.aboutFinalNote}>Note: This app has functionalities that are fullfilled with the Health DedsBot. </Text>
      </ScrollView>







    </View>
  )
}