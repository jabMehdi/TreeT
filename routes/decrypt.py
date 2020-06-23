import sys
import json
MeterRead = sys.argv[1]
FrameOffset = MeterRead.find('fefefefe')
FrameText = MeterRead[FrameOffset:]
Leading = FrameText[0:8].upper()
FrameStarter1 = FrameText[8:10]
Address = FrameText[20:22]+FrameText[18:20]+FrameText[16:18]+FrameText[14:16]+FrameText[12:14]+FrameText[10:12]
FrameStarter2 = FrameText[22:24]
ControlCode = FrameText[24:26]
Length = FrameText[26:28].upper()
DataIdentificationString = FrameText[28:36]
if DataIdentificationString == '34439337' and Length == '1D' : ##DDS155
    DataIdentification = '04601001'
    ComActiveTotalEnergyString = FrameText[36:44]
    ComActiveTotalEnergyTempA = str(hex(int(ComActiveTotalEnergyString[0] ,16) - 0x3))[2]
    ComActiveTotalEnergyTempB = str(hex(int(ComActiveTotalEnergyString[1] ,16) - 0x3))[2]
    ComActiveTotalEnergyTempC = str(hex(int(ComActiveTotalEnergyString[2] ,16) - 0x3))[2]
    ComActiveTotalEnergyTempD = str(hex(int(ComActiveTotalEnergyString[3] ,16) - 0x3))[2]
    ComActiveTotalEnergyTempE = str(hex(int(ComActiveTotalEnergyString[4] ,16) - 0x3))[2]
    ComActiveTotalEnergyTempF = str(hex(int(ComActiveTotalEnergyString[5] ,16) - 0x3))[2]
    ComActiveTotalEnergyTempG = str(hex(int(ComActiveTotalEnergyString[6] ,16) - 0x3))[2]
    ComActiveTotalEnergyTempH = str(hex(int(ComActiveTotalEnergyString[7] ,16) - 0x3))[2]
    ComActiveTotalEnergy =  ComActiveTotalEnergyTempG + ComActiveTotalEnergyTempH + ComActiveTotalEnergyTempE + ComActiveTotalEnergyTempF + ComActiveTotalEnergyTempC + ComActiveTotalEnergyTempD + '.' + ComActiveTotalEnergyTempA + ComActiveTotalEnergyTempB
    PositiveActiveTotalEnergyString = FrameText[44:52]
    PositiveActiveTotalEnergyTempA = str(hex(int(PositiveActiveTotalEnergyString[0] ,16) - 0x3))[2]
    PositiveActiveTotalEnergyTempB = str(hex(int(PositiveActiveTotalEnergyString[1] ,16) - 0x3))[2]
    PositiveActiveTotalEnergyTempC = str(hex(int(PositiveActiveTotalEnergyString[2] ,16) - 0x3))[2]
    PositiveActiveTotalEnergyTempD = str(hex(int(PositiveActiveTotalEnergyString[3] ,16) - 0x3))[2]
    PositiveActiveTotalEnergyTempE = str(hex(int(PositiveActiveTotalEnergyString[4] ,16) - 0x3))[2]
    PositiveActiveTotalEnergyTempF = str(hex(int(PositiveActiveTotalEnergyString[5] ,16) - 0x3))[2]
    PositiveActiveTotalEnergyTempG = str(hex(int(PositiveActiveTotalEnergyString[6] ,16) - 0x3))[2]
    PositiveActiveTotalEnergyTempH = str(hex(int(PositiveActiveTotalEnergyString[7] ,16) - 0x3))[2]
    PositiveActiveTotalEnergy =  PositiveActiveTotalEnergyTempG + PositiveActiveTotalEnergyTempH + PositiveActiveTotalEnergyTempE + PositiveActiveTotalEnergyTempF + PositiveActiveTotalEnergyTempC + PositiveActiveTotalEnergyTempD + '.' + PositiveActiveTotalEnergyTempA + PositiveActiveTotalEnergyTempB
    ReverseActiveTotalEnergyString = FrameText[52:60]
    ReverseActiveTotalEnergyTempA = str(hex(int(ReverseActiveTotalEnergyString[0] ,16) - 0x3))[2]
    ReverseActiveTotalEnergyTempB = str(hex(int(ReverseActiveTotalEnergyString[1] ,16) - 0x3))[2]
    ReverseActiveTotalEnergyTempC = str(hex(int(ReverseActiveTotalEnergyString[2] ,16) - 0x3))[2]
    ReverseActiveTotalEnergyTempD = str(hex(int(ReverseActiveTotalEnergyString[3] ,16) - 0x3))[2]
    ReverseActiveTotalEnergyTempE = str(hex(int(ReverseActiveTotalEnergyString[4] ,16) - 0x3))[2]
    ReverseActiveTotalEnergyTempF = str(hex(int(ReverseActiveTotalEnergyString[5] ,16) - 0x3))[2]
    ReverseActiveTotalEnergyTempG = str(hex(int(ReverseActiveTotalEnergyString[6] ,16) - 0x3))[2]
    ReverseActiveTotalEnergyTempH = str(hex(int(ReverseActiveTotalEnergyString[7] ,16) - 0x3))[2]
    ReverseActiveTotalEnergy =  ReverseActiveTotalEnergyTempG + ReverseActiveTotalEnergyTempH + ReverseActiveTotalEnergyTempE + ReverseActiveTotalEnergyTempF + ReverseActiveTotalEnergyTempC + ReverseActiveTotalEnergyTempD + '.' + ReverseActiveTotalEnergyTempA + ReverseActiveTotalEnergyTempB
    VoltageString = FrameText[60:64]
    VoltageTempA = str(hex(int(VoltageString[0] ,16) - 0x3))[2]
    VoltageTempB = str(hex(int(VoltageString[1] ,16) - 0x3))[2]
    VoltageTempC = str(hex(int(VoltageString[2] ,16) - 0x3))[2]
    VoltageTempD = str(hex(int(VoltageString[3] ,16) - 0x3))[2]
    Voltage =  VoltageTempC + VoltageTempD + VoltageTempA + '.' + VoltageTempB
    CurrentString = FrameText[64:70]
    CurrentTempA = str(hex(int(CurrentString[0] ,16) - 0x3))[2]
    CurrentTempB = str(hex(int(CurrentString[1] ,16) - 0x3))[2]
    CurrentTempC = str(hex(int(CurrentString[2] ,16) - 0x3))[2]
    CurrentTempD = str(hex(int(CurrentString[3] ,16) - 0x3))[2]
    CurrentTempE = str(hex(int(CurrentString[4] ,16) - 0x3))[2]
    CurrentTempF = str(hex(int(CurrentString[5] ,16) - 0x3))[2]
    Current =  CurrentTempE + CurrentTempF + CurrentTempC + '.' + CurrentTempD + CurrentTempA + CurrentTempB
    ActivePowerString = FrameText[70:76]
    ActivePowerTempA = str(hex(int(ActivePowerString[0] ,16) - 0x3))[2]
    ActivePowerTempB = str(hex(int(ActivePowerString[1] ,16) - 0x3))[2]
    ActivePowerTempC = str(hex(int(ActivePowerString[2] ,16) - 0x3))[2]
    ActivePowerTempD = str(hex(int(ActivePowerString[3] ,16) - 0x3))[2]
    ActivePowerTempE = str(hex(int(ActivePowerString[4] ,16) - 0x3))[2]
    ActivePowerTempF = str(hex(int(ActivePowerString[5] ,16) - 0x3))[2]
    ActivePower =  ActivePowerTempE + ActivePowerTempF + '.' + ActivePowerTempC + ActivePowerTempD + ActivePowerTempA + ActivePowerTempB
    PowerGridFrequencyString = FrameText[76:80]
    PowerGridFrequencyTempA = str(hex(int(PowerGridFrequencyString[0] ,16) - 0x3))[2]
    PowerGridFrequencyTempB = str(hex(int(PowerGridFrequencyString[1] ,16) - 0x3))[2]
    PowerGridFrequencyTempC = str(hex(int(PowerGridFrequencyString[2] ,16) - 0x3))[2]
    PowerGridFrequencyTempD = str(hex(int(PowerGridFrequencyString[3] ,16) - 0x3))[2]
    PowerGridFrequency =  PowerGridFrequencyTempC + PowerGridFrequencyTempD + '.' + PowerGridFrequencyTempA + PowerGridFrequencyTempB
    PowerFactorString = FrameText[80:84]
    PowerFactorTempA = str(hex(int(PowerFactorString[0] ,16) - 0x3))[2]
    PowerFactorTempB = str(hex(int(PowerFactorString[1] ,16) - 0x3))[2]
    PowerFactorTempC = str(hex(int(PowerFactorString[2] ,16) - 0x3))[2]
    PowerFactorTempD = str(hex(int(PowerFactorString[3] ,16) - 0x3))[2]
    PowerFactor =  PowerFactorTempC + '.' + PowerFactorTempD + PowerFactorTempA + PowerFactorTempB
    StatusByte = FrameText[84:86].upper()
    Checksum = FrameText[86:88].upper()
    Terminator = FrameText[88:90]
    data = { 'electric_DataIdentification':DataIdentification ,
             'ComActiveTotalEnergy': ComActiveTotalEnergy ,
             'PositiveActiveTotalEnergy':PositiveActiveTotalEnergy ,
             'ReverseActiveTotalEnergy':ReverseActiveTotalEnergy ,
             'Voltage': Voltage ,
             'Current' : Current ,
             'ActivePower' : ActivePower ,
             'PowerGridFrequency' : PowerGridFrequency ,
             'PowerFactor' : PowerFactor
            }
    data_json = json.dumps(data)
    print(data_json)
    #print ('Radarking DDS155 Single-Phase Electric Meter')
    #print ('Leading:',Leading)
    #print ('Frame Starter:',FrameStarter1)
    #print ('Address: ',Address)
    #print ('Frame Starter:',FrameStarter2)
    #print ('Control Code:',ControlCode)
   # print ('Length:',Length)
    #print ('Data Identification:',DataIdentification)
   # print ('Com Active Total Energy:',ComActiveTotalEnergy,'kWh')
    #print ('Positive Active Total Energy:',PositiveActiveTotalEnergy,'kWh')
   # print ('Reverse Active Total Energy:',ReverseActiveTotalEnergy,'kWh')
    #print ('Voltage:',Voltage,'V')
    #print ('Current:',Current,'A')
    #print ('Active Power:',ActivePower,'kW')
    #print ('Power Grid Frequency:',PowerGridFrequency,'Hz')
    #print ('Power Factor:',PowerFactor)
    #print ('Status Byte:',StatusByte)
    #print ('Checksum:',Checksum)
    #print ('Terminator:',Terminator)
if ControlCode == '91' and DataIdentificationString == '34459337' : ##DTS150
    DataIdentificationTempA = str(hex(int(DataIdentificationString[0] ,16) - 0x3))[2]
    DataIdentificationTempB = str(hex(int(DataIdentificationString[1] ,16) - 0x3))[2]
    DataIdentificationTempC = str(hex(int(DataIdentificationString[2] ,16) - 0x3))[2]
    DataIdentificationTempD = str(hex(int(DataIdentificationString[3] ,16) - 0x3))[2]
    DataIdentificationTempE = str(hex(int(DataIdentificationString[4] ,16) - 0x3))[2]
    DataIdentificationTempF = str(hex(int(DataIdentificationString[5] ,16) - 0x3))[2]
    DataIdentificationTempG = str(hex(int(DataIdentificationString[6] ,16) - 0x3))[2]
    DataIdentificationTempH = str(hex(int(DataIdentificationString[7] ,16) - 0x3))[2]
    DataIdentification =  DataIdentificationTempG + DataIdentificationTempH + DataIdentificationTempE + DataIdentificationTempF + DataIdentificationTempC + DataIdentificationTempD + DataIdentificationTempA + DataIdentificationTempB
    VoltagePhaseAString = FrameText[36:40]
    VoltagePhaseATempA = str(hex(int(VoltagePhaseAString[0] ,16) - 0x3))[2]
    VoltagePhaseATempB = str(hex(int(VoltagePhaseAString[1] ,16) - 0x3))[2]
    VoltagePhaseATempC = str(hex(int(VoltagePhaseAString[2] ,16) - 0x3))[2]
    VoltagePhaseATempD = str(hex(int(VoltagePhaseAString[3] ,16) - 0x3))[2]
    VoltagePhaseA =  VoltagePhaseATempC + VoltagePhaseATempD + VoltagePhaseATempA + '.' + VoltagePhaseATempB
    VoltagePhaseBString = FrameText[40:44]
    VoltagePhaseBTempA = str(hex(int(VoltagePhaseBString[0] ,16) - 0x3))[2]
    VoltagePhaseBTempB = str(hex(int(VoltagePhaseBString[1] ,16) - 0x3))[2]
    VoltagePhaseBTempC = str(hex(int(VoltagePhaseBString[2] ,16) - 0x3))[2]
    VoltagePhaseBTempD = str(hex(int(VoltagePhaseBString[3] ,16) - 0x3))[2]
    VoltagePhaseB =  VoltagePhaseBTempC + VoltagePhaseBTempD + VoltagePhaseBTempA + '.' + VoltagePhaseBTempB
    VoltagePhaseCString = FrameText[44:48]
    VoltagePhaseCTempA = str(hex(int(VoltagePhaseCString[0] ,16) - 0x3))[2]
    VoltagePhaseCTempB = str(hex(int(VoltagePhaseCString[1] ,16) - 0x3))[2]
    VoltagePhaseCTempC = str(hex(int(VoltagePhaseCString[2] ,16) - 0x3))[2]
    VoltagePhaseCTempD = str(hex(int(VoltagePhaseCString[3] ,16) - 0x3))[2]
    VoltagePhaseC =  VoltagePhaseCTempC + VoltagePhaseCTempD + VoltagePhaseCTempA + '.' + VoltagePhaseCTempB
    CurrentPhaseAString = FrameText[48:54]
    CurrentPhaseATempA = str(hex(int(CurrentPhaseAString[0] ,16) - 0x3))[2]
    CurrentPhaseATempB = str(hex(int(CurrentPhaseAString[1] ,16) - 0x3))[2]
    CurrentPhaseATempC = str(hex(int(CurrentPhaseAString[2] ,16) - 0x3))[2]
    CurrentPhaseATempD = str(hex(int(CurrentPhaseAString[3] ,16) - 0x3))[2]
    CurrentPhaseATempE = str(hex(int(CurrentPhaseAString[4] ,16) - 0x3))[2]
    CurrentPhaseATempF = str(hex(int(CurrentPhaseAString[5] ,16) - 0x3))[2]
    CurrentPhaseA =  CurrentPhaseATempE + CurrentPhaseATempF + CurrentPhaseATempC + '.' + CurrentPhaseATempD + CurrentPhaseATempA + CurrentPhaseATempB
    CurrentPhaseBString = FrameText[54:60]
    CurrentPhaseBTempA = str(hex(int(CurrentPhaseBString[0] ,16) - 0x3))[2]
    CurrentPhaseBTempB = str(hex(int(CurrentPhaseBString[1] ,16) - 0x3))[2]
    CurrentPhaseBTempC = str(hex(int(CurrentPhaseBString[2] ,16) - 0x3))[2]
    CurrentPhaseBTempD = str(hex(int(CurrentPhaseBString[3] ,16) - 0x3))[2]
    CurrentPhaseBTempE = str(hex(int(CurrentPhaseBString[4] ,16) - 0x3))[2]
    CurrentPhaseBTempF = str(hex(int(CurrentPhaseBString[5] ,16) - 0x3))[2]
    CurrentPhaseB =  CurrentPhaseBTempE + CurrentPhaseBTempF + CurrentPhaseBTempC + '.' + CurrentPhaseBTempD + CurrentPhaseBTempA + CurrentPhaseBTempB
    CurrentPhaseCString = FrameText[60:66]
    CurrentPhaseCTempA = str(hex(int(CurrentPhaseCString[0] ,16) - 0x3))[2]
    CurrentPhaseCTempB = str(hex(int(CurrentPhaseCString[1] ,16) - 0x3))[2]
    CurrentPhaseCTempC = str(hex(int(CurrentPhaseCString[2] ,16) - 0x3))[2]
    CurrentPhaseCTempD = str(hex(int(CurrentPhaseCString[3] ,16) - 0x3))[2]
    CurrentPhaseCTempE = str(hex(int(CurrentPhaseCString[4] ,16) - 0x3))[2]
    CurrentPhaseCTempF = str(hex(int(CurrentPhaseCString[5] ,16) - 0x3))[2]
    CurrentPhaseC =  CurrentPhaseCTempE + CurrentPhaseCTempF + CurrentPhaseCTempC + '.' + CurrentPhaseCTempD + CurrentPhaseCTempA + CurrentPhaseCTempB
    Checksum = FrameText[66:68].upper()
    Terminator = FrameText[68:70]
    data = { 'VoltagePhaseA': VoltagePhaseA ,
             'VoltagePhaseB': VoltagePhaseB ,
             'VoltagePhaseC': VoltagePhaseC ,
             'CurrentPhaseA': CurrentPhaseA ,
             'CurrentPhaseB' : CurrentPhaseB ,
             'CurrentPhaseC' : CurrentPhaseC
            }
    data_json = json.dumps(data)
    print(data_json)
  # print ('Radarking DTS150 Three-Phase Electric Meter')
  # print ('Leading:',Leading)
  # print ('Frame Starter:',FrameStarter1)
  # print ('Address: ',Address)
  # print ('Frame Starter:',FrameStarter2)
  # print ('Control Code:',ControlCode)
  # print ('Length:',Length)
  # print ('Data Identification:',DataIdentification)
  # print ('Voltage - Phase A:', VoltagePhaseA, 'V')
  # print ('Voltage - Phase B:', VoltagePhaseB, 'V')
  # print ('Voltage - Phase C:', VoltagePhaseC, 'V')
  # print ('Current - Phase A:', CurrentPhaseA, 'A')
  # print ('Current - Phase B:', CurrentPhaseB, 'A')
  # print ('Current - Phase C:', CurrentPhaseC, 'A')
  # print ('Checksum:',Checksum)
  # print ('Terminator:',Terminator)
if ControlCode == '91' and DataIdentificationString == '35459337' : ##DTS150
    DataIdentificationTempA = str(hex(int(DataIdentificationString[0] ,16) - 0x3))[2]
    DataIdentificationTempB = str(hex(int(DataIdentificationString[1] ,16) - 0x3))[2]
    DataIdentificationTempC = str(hex(int(DataIdentificationString[2] ,16) - 0x3))[2]
    DataIdentificationTempD = str(hex(int(DataIdentificationString[3] ,16) - 0x3))[2]
    DataIdentificationTempE = str(hex(int(DataIdentificationString[4] ,16) - 0x3))[2]
    DataIdentificationTempF = str(hex(int(DataIdentificationString[5] ,16) - 0x3))[2]
    DataIdentificationTempG = str(hex(int(DataIdentificationString[6] ,16) - 0x3))[2]
    DataIdentificationTempH = str(hex(int(DataIdentificationString[7] ,16) - 0x3))[2]
    DataIdentification =  DataIdentificationTempG + DataIdentificationTempH + DataIdentificationTempE + DataIdentificationTempF + DataIdentificationTempC + DataIdentificationTempD + DataIdentificationTempA + DataIdentificationTempB
    ActivePowerTotalString = FrameText[36:42]
    ActivePowerTotalTempA = str(hex(int(ActivePowerTotalString[0] ,16) - 0x3))[2]
    ActivePowerTotalTempB = str(hex(int(ActivePowerTotalString[1] ,16) - 0x3))[2]
    ActivePowerTotalTempC = str(hex(int(ActivePowerTotalString[2] ,16) - 0x3))[2]
    ActivePowerTotalTempD = str(hex(int(ActivePowerTotalString[3] ,16) - 0x3))[2]
    ActivePowerTotalTempE = str(hex(int(ActivePowerTotalString[4] ,16) - 0x3))[2]
    ActivePowerTotalTempF = str(hex(int(ActivePowerTotalString[5] ,16) - 0x3))[2]
    ActivePowerTotal =  ActivePowerTotalTempE + ActivePowerTotalTempF + '.' + ActivePowerTotalTempC + ActivePowerTotalTempD + ActivePowerTotalTempA + ActivePowerTotalTempB
    ActivePowerPhaseAString = FrameText[42:48]
    ActivePowerPhaseATempA = str(hex(int(ActivePowerPhaseAString[0] ,16) - 0x3))[2]
    ActivePowerPhaseATempB = str(hex(int(ActivePowerPhaseAString[1] ,16) - 0x3))[2]
    ActivePowerPhaseATempC = str(hex(int(ActivePowerPhaseAString[2] ,16) - 0x3))[2]
    ActivePowerPhaseATempD = str(hex(int(ActivePowerPhaseAString[3] ,16) - 0x3))[2]
    ActivePowerPhaseATempE = str(hex(int(ActivePowerPhaseAString[4] ,16) - 0x3))[2]
    ActivePowerPhaseATempF = str(hex(int(ActivePowerPhaseAString[5] ,16) - 0x3))[2]
    ActivePowerPhaseA =  ActivePowerPhaseATempE + ActivePowerPhaseATempF + '.' + ActivePowerPhaseATempC + ActivePowerPhaseATempD + ActivePowerPhaseATempA + ActivePowerPhaseATempB
    ActivePowerPhaseBString = FrameText[48:54]
    ActivePowerPhaseBTempA = str(hex(int(ActivePowerPhaseBString[0] ,16) - 0x3))[2]
    ActivePowerPhaseBTempB = str(hex(int(ActivePowerPhaseBString[1] ,16) - 0x3))[2]
    ActivePowerPhaseBTempC = str(hex(int(ActivePowerPhaseBString[2] ,16) - 0x3))[2]
    ActivePowerPhaseBTempD = str(hex(int(ActivePowerPhaseBString[3] ,16) - 0x3))[2]
    ActivePowerPhaseBTempE = str(hex(int(ActivePowerPhaseBString[4] ,16) - 0x3))[2]
    ActivePowerPhaseBTempF = str(hex(int(ActivePowerPhaseBString[5] ,16) - 0x3))[2]
    ActivePowerPhaseB =  ActivePowerPhaseBTempE + ActivePowerPhaseBTempF + '.' + ActivePowerPhaseBTempC + ActivePowerPhaseBTempD + ActivePowerPhaseBTempA + ActivePowerPhaseBTempB
    ActivePowerPhaseCString = FrameText[54:60]
    ActivePowerPhaseCTempA = str(hex(int(ActivePowerPhaseCString[0] ,16) - 0x3))[2]
    ActivePowerPhaseCTempB = str(hex(int(ActivePowerPhaseCString[1] ,16) - 0x3))[2]
    ActivePowerPhaseCTempC = str(hex(int(ActivePowerPhaseCString[2] ,16) - 0x3))[2]
    ActivePowerPhaseCTempD = str(hex(int(ActivePowerPhaseCString[3] ,16) - 0x3))[2]
    ActivePowerPhaseCTempE = str(hex(int(ActivePowerPhaseCString[4] ,16) - 0x3))[2]
    ActivePowerPhaseCTempF = str(hex(int(ActivePowerPhaseCString[5] ,16) - 0x3))[2]
    ActivePowerPhaseC =  ActivePowerPhaseCTempE + ActivePowerPhaseCTempF + '.' + ActivePowerPhaseCTempC + ActivePowerPhaseCTempD + ActivePowerPhaseCTempA + ActivePowerPhaseCTempB
    PowerFactorTotalString = FrameText[60:64]
    PowerFactorTotalTempA = str(hex(int(PowerFactorTotalString[0] ,16) - 0x3))[2]
    PowerFactorTotalTempB = str(hex(int(PowerFactorTotalString[1] ,16) - 0x3))[2]
    PowerFactorTotalTempC = str(hex(int(PowerFactorTotalString[2] ,16) - 0x3))[2]
    PowerFactorTotalTempD = str(hex(int(PowerFactorTotalString[3] ,16) - 0x3))[2]
    PowerFactorTotal =  PowerFactorTotalTempC + '.' + PowerFactorTotalTempD + PowerFactorTotalTempA + PowerFactorTotalTempB
    PowerFactorPhaseAString = FrameText[64:68]
    PowerFactorPhaseATempA = str(hex(int(PowerFactorPhaseAString[0] ,16) - 0x3))[2]
    PowerFactorPhaseATempB = str(hex(int(PowerFactorPhaseAString[1] ,16) - 0x3))[2]
    PowerFactorPhaseATempC = str(hex(int(PowerFactorPhaseAString[2] ,16) - 0x3))[2]
    PowerFactorPhaseATempD = str(hex(int(PowerFactorPhaseAString[3] ,16) - 0x3))[2]
    PowerFactorPhaseA =  PowerFactorPhaseATempC + '.' + PowerFactorPhaseATempD + PowerFactorPhaseATempA + PowerFactorPhaseATempB
    PowerFactorPhaseBString = FrameText[68:72]
    PowerFactorPhaseBTempA = str(hex(int(PowerFactorPhaseBString[0] ,16) - 0x3))[2]
    PowerFactorPhaseBTempB = str(hex(int(PowerFactorPhaseBString[1] ,16) - 0x3))[2]
    PowerFactorPhaseBTempC = str(hex(int(PowerFactorPhaseBString[2] ,16) - 0x3))[2]
    PowerFactorPhaseBTempD = str(hex(int(PowerFactorPhaseBString[3] ,16) - 0x3))[2]
    PowerFactorPhaseB =  PowerFactorPhaseBTempC + '.' + PowerFactorPhaseBTempD + PowerFactorPhaseBTempA + PowerFactorPhaseBTempB
    PowerFactorPhaseCString = FrameText[72:76]
    PowerFactorPhaseCTempA = str(hex(int(PowerFactorPhaseCString[0] ,16) - 0x3))[2]
    PowerFactorPhaseCTempB = str(hex(int(PowerFactorPhaseCString[1] ,16) - 0x3))[2]
    PowerFactorPhaseCTempC = str(hex(int(PowerFactorPhaseCString[2] ,16) - 0x3))[2]
    PowerFactorPhaseCTempD = str(hex(int(PowerFactorPhaseCString[3] ,16) - 0x3))[2]
    PowerFactorPhaseC =  PowerFactorPhaseCTempC + '.' + PowerFactorPhaseCTempD + PowerFactorPhaseCTempA + PowerFactorPhaseCTempB
    StatusDigit = str(hex(int(FrameText[76:77] ,16) - 0x3))[2] + str(hex(int(FrameText[77:78] ,16) - 0x3))[2]
    Checksum = FrameText[78:80].upper()
    Terminator = FrameText[80:82]
    data = { 'ActivePowerTotal': ActivePowerTotal,
             'ActivePowerPhaseA' : ActivePowerPhaseA ,
             'ActivePowerPhaseB' : ActivePowerPhaseB ,
             'ActivePowerPhaseC' : ActivePowerPhaseC ,
             'PowerFactorTotal' : PowerFactorTotal ,
             'PowerFactorPhaseA': PowerFactorPhaseA ,
             'PowerFactorPhaseB': PowerFactorPhaseB ,
             'PowerFactorPhaseC': PowerFactorPhaseC
            }
    data_json = json.dumps(data)
    print(data_json)
  #print ('Radarking DTS150 Three-Phase Electric Meter')
  # print ('Leading:',Leading)
  # print ('Frame Starter:',FrameStarter1)
  # print ('Address: ',Address)
  # print ('Frame Starter:',FrameStarter2)
  # print ('Control Code:',ControlCode)
  # print ('Length:',Length)
  # print ('Data Identification:',DataIdentification)
  # print ('Active Power - Total:', ActivePowerTotal,'kW')
  # print ('Active Power - Phase A:', ActivePowerPhaseA,'kW')
  # print ('Active Power - Phase B:', ActivePowerPhaseB,'kW')
  # print ('Active Power - Phase C:', ActivePowerPhaseC,'kW')
  # print ('Power Factor - Total:', PowerFactorTotal)
  # print ('Power Factor - Phase A:', PowerFactorPhaseA)
  # print ('Power Factor - Phase B:', PowerFactorPhaseB)
  # print ('Power Factor - Phase C:', PowerFactorPhaseC)
  # print ('Status Digit:',StatusDigit)
  # print ('Checksum:',Checksum)
  # print ('Terminator:',Terminator)

if ControlCode == '91' and DataIdentificationString ==  '33323333' : ##DTS150
    DataIdentification = '0000FF00'
    ComActiveTotalString = FrameText[36:42]
    ComActiveTotalTempA = str(hex(int(ComActiveTotalString[0] ,16) - 0x3))[2]
    ComActiveTotalTempB = str(hex(int(ComActiveTotalString[1] ,16) - 0x3))[2]
    ComActiveTotalTempC = str(hex(int(ComActiveTotalString[2] ,16) - 0x3))[2]
    ComActiveTotalTempD = str(hex(int(ComActiveTotalString[3] ,16) - 0x3))[2]
    ComActiveTotalTempE = str(hex(int(ComActiveTotalString[4] ,16) - 0x3))[2]
    ComActiveTotalTempF = str(hex(int(ComActiveTotalString[5] ,16) - 0x3))[2]
    ComActiveTotal =  ComActiveTotalTempE + ComActiveTotalTempF + ComActiveTotalTempC + ComActiveTotalTempD + '.' + ComActiveTotalTempA + ComActiveTotalTempB
    ComActiveTariff1String = FrameText[42:48]
    ComActiveTariff1TempA = str(hex(int(ComActiveTariff1String[0] ,16) - 0x3))[2]
    ComActiveTariff1TempB = str(hex(int(ComActiveTariff1String[1] ,16) - 0x3))[2]
    ComActiveTariff1TempC = str(hex(int(ComActiveTariff1String[2] ,16) - 0x3))[2]
    ComActiveTariff1TempD = str(hex(int(ComActiveTariff1String[3] ,16) - 0x3))[2]
    ComActiveTariff1TempE = str(hex(int(ComActiveTariff1String[4] ,16) - 0x3))[2]
    ComActiveTariff1TempF = str(hex(int(ComActiveTariff1String[5] ,16) - 0x3))[2]
    ComActiveTariff1 =  ComActiveTariff1TempE + ComActiveTariff1TempF + ComActiveTariff1TempC + ComActiveTariff1TempD + '.' + ComActiveTariff1TempA + ComActiveTariff1TempB
    ComActiveTariff2String = FrameText[48:54]
    ComActiveTariff2TempA = str(hex(int(ComActiveTariff2String[0] ,16) - 0x3))[2]
    ComActiveTariff2TempB = str(hex(int(ComActiveTariff2String[1] ,16) - 0x3))[2]
    ComActiveTariff2TempC = str(hex(int(ComActiveTariff2String[2] ,16) - 0x3))[2]
    ComActiveTariff2TempD = str(hex(int(ComActiveTariff2String[3] ,16) - 0x3))[2]
    ComActiveTariff2TempE = str(hex(int(ComActiveTariff2String[4] ,16) - 0x3))[2]
    ComActiveTariff2TempF = str(hex(int(ComActiveTariff2String[5] ,16) - 0x3))[2]
    ComActiveTariff2 =  ComActiveTariff2TempE + ComActiveTariff2TempF + ComActiveTariff2TempC + ComActiveTariff2TempD + '.' + ComActiveTariff2TempA + ComActiveTariff2TempB
    ComActiveTariff3String = FrameText[54:60]
    ComActiveTariff3TempA = str(hex(int(ComActiveTariff3String[0] ,16) - 0x3))[2]
    ComActiveTariff3TempB = str(hex(int(ComActiveTariff3String[1] ,16) - 0x3))[2]
    ComActiveTariff3TempC = str(hex(int(ComActiveTariff3String[2] ,16) - 0x3))[2]
    ComActiveTariff3TempD = str(hex(int(ComActiveTariff3String[3] ,16) - 0x3))[2]
    ComActiveTariff3TempE = str(hex(int(ComActiveTariff3String[4] ,16) - 0x3))[2]
    ComActiveTariff3TempF = str(hex(int(ComActiveTariff3String[5] ,16) - 0x3))[2]
    ComActiveTariff3 =  ComActiveTariff3TempE + ComActiveTariff3TempF + ComActiveTariff3TempC + ComActiveTariff3TempD + '.' + ComActiveTariff3TempA + ComActiveTariff3TempB
    ComActiveTariff4String = FrameText[60:66]
    ComActiveTariff4TempA = str(hex(int(ComActiveTariff4String[0] ,16) - 0x3))[2]
    ComActiveTariff4TempB = str(hex(int(ComActiveTariff4String[1] ,16) - 0x3))[2]
    ComActiveTariff4TempC = str(hex(int(ComActiveTariff4String[2] ,16) - 0x3))[2]
    ComActiveTariff4TempD = str(hex(int(ComActiveTariff4String[3] ,16) - 0x3))[2]
    ComActiveTariff4TempE = str(hex(int(ComActiveTariff4String[4] ,16) - 0x3))[2]
    ComActiveTariff4TempF = str(hex(int(ComActiveTariff4String[5] ,16) - 0x3))[2]
    ComActiveTariff4 =  ComActiveTariff4TempE + ComActiveTariff4TempF + ComActiveTariff4TempC + ComActiveTariff4TempD + '.' + ComActiveTariff4TempA + ComActiveTariff4TempB
    Checksum = FrameText[66:68].upper()
    Terminator = FrameText[68:70]
    data = { 'electric_DataIdentification':DataIdentification ,

            }
    data_json = json.dumps(data)
    print(data_json)
  # print ('Radarking DTS150 Three-Phase Electric Meter')
  # print ('Leading:',Leading)
  # print ('Frame Starter:',FrameStarter1)
  # print ('Address: ',Address)
  # print ('Frame Starter:',FrameStarter2)
  # print ('Control Code:',ControlCode)
  # print ('Length:',Length)
  # print ('Data Identification:',DataIdentification)
  # print ('Com Active Total:',ComActiveTotal,'kWh')
  # print ('Com Active - Tariff 1:',ComActiveTariff1,'kWh')
  # print ('Com Active - Tariff 2:',ComActiveTariff2,'kWh')
  # print ('Com Active - Tariff 3:',ComActiveTariff3,'kWh')
  # print ('Com Active - Tariff 4:',ComActiveTariff4,'kWh')
  # print ('Checksum:',Checksum)
  # print ('Terminator:',Terminator)
if ControlCode == '91' and DataIdentificationString ==  '33323433' : ##DTS150
    DataIdentification = '0001FF00'
    PositiveActiveTotalString = FrameText[36:42]
    PositiveActiveTotalTempA = str(hex(int(PositiveActiveTotalString[0] ,16) - 0x3))[2]
    PositiveActiveTotalTempB = str(hex(int(PositiveActiveTotalString[1] ,16) - 0x3))[2]
    PositiveActiveTotalTempC = str(hex(int(PositiveActiveTotalString[2] ,16) - 0x3))[2]
    PositiveActiveTotalTempD = str(hex(int(PositiveActiveTotalString[3] ,16) - 0x3))[2]
    PositiveActiveTotalTempE = str(hex(int(PositiveActiveTotalString[4] ,16) - 0x3))[2]
    PositiveActiveTotalTempF = str(hex(int(PositiveActiveTotalString[5] ,16) - 0x3))[2]
    PositiveActiveTotal =  PositiveActiveTotalTempE + PositiveActiveTotalTempF + PositiveActiveTotalTempC + PositiveActiveTotalTempD + '.' + PositiveActiveTotalTempA + PositiveActiveTotalTempB
    PositiveActiveTariff1String = FrameText[42:48]
    PositiveActiveTariff1TempA = str(hex(int(PositiveActiveTariff1String[0] ,16) - 0x3))[2]
    PositiveActiveTariff1TempB = str(hex(int(PositiveActiveTariff1String[1] ,16) - 0x3))[2]
    PositiveActiveTariff1TempC = str(hex(int(PositiveActiveTariff1String[2] ,16) - 0x3))[2]
    PositiveActiveTariff1TempD = str(hex(int(PositiveActiveTariff1String[3] ,16) - 0x3))[2]
    PositiveActiveTariff1TempE = str(hex(int(PositiveActiveTariff1String[4] ,16) - 0x3))[2]
    PositiveActiveTariff1TempF = str(hex(int(PositiveActiveTariff1String[5] ,16) - 0x3))[2]
    PositiveActiveTariff1 =  PositiveActiveTariff1TempE + PositiveActiveTariff1TempF + PositiveActiveTariff1TempC + PositiveActiveTariff1TempD + '.' + PositiveActiveTariff1TempA + PositiveActiveTariff1TempB
    PositiveActiveTariff2String = FrameText[48:54]
    PositiveActiveTariff2TempA = str(hex(int(PositiveActiveTariff2String[0] ,16) - 0x3))[2]
    PositiveActiveTariff2TempB = str(hex(int(PositiveActiveTariff2String[1] ,16) - 0x3))[2]
    PositiveActiveTariff2TempC = str(hex(int(PositiveActiveTariff2String[2] ,16) - 0x3))[2]
    PositiveActiveTariff2TempD = str(hex(int(PositiveActiveTariff2String[3] ,16) - 0x3))[2]
    PositiveActiveTariff2TempE = str(hex(int(PositiveActiveTariff2String[4] ,16) - 0x3))[2]
    PositiveActiveTariff2TempF = str(hex(int(PositiveActiveTariff2String[5] ,16) - 0x3))[2]
    PositiveActiveTariff2 =  PositiveActiveTariff2TempE + PositiveActiveTariff2TempF + PositiveActiveTariff2TempC + PositiveActiveTariff2TempD + '.' + PositiveActiveTariff2TempA + PositiveActiveTariff2TempB
    PositiveActiveTariff3String = FrameText[54:60]
    PositiveActiveTariff3TempA = str(hex(int(PositiveActiveTariff3String[0] ,16) - 0x3))[2]
    PositiveActiveTariff3TempB = str(hex(int(PositiveActiveTariff3String[1] ,16) - 0x3))[2]
    PositiveActiveTariff3TempC = str(hex(int(PositiveActiveTariff3String[2] ,16) - 0x3))[2]
    PositiveActiveTariff3TempD = str(hex(int(PositiveActiveTariff3String[3] ,16) - 0x3))[2]
    PositiveActiveTariff3TempE = str(hex(int(PositiveActiveTariff3String[4] ,16) - 0x3))[2]
    PositiveActiveTariff3TempF = str(hex(int(PositiveActiveTariff3String[5] ,16) - 0x3))[2]
    PositiveActiveTariff3 =  PositiveActiveTariff3TempE + PositiveActiveTariff3TempF + PositiveActiveTariff3TempC + PositiveActiveTariff3TempD + '.' + PositiveActiveTariff3TempA + PositiveActiveTariff3TempB
    PositiveActiveTariff4String = FrameText[60:66]
    PositiveActiveTariff4TempA = str(hex(int(PositiveActiveTariff4String[0] ,16) - 0x3))[2]
    PositiveActiveTariff4TempB = str(hex(int(PositiveActiveTariff4String[1] ,16) - 0x3))[2]
    PositiveActiveTariff4TempC = str(hex(int(PositiveActiveTariff4String[2] ,16) - 0x3))[2]
    PositiveActiveTariff4TempD = str(hex(int(PositiveActiveTariff4String[3] ,16) - 0x3))[2]
    PositiveActiveTariff4TempE = str(hex(int(PositiveActiveTariff4String[4] ,16) - 0x3))[2]
    PositiveActiveTariff4TempF = str(hex(int(PositiveActiveTariff4String[5] ,16) - 0x3))[2]
    PositiveActiveTariff4 =  PositiveActiveTariff4TempE + PositiveActiveTariff4TempF + PositiveActiveTariff4TempC + PositiveActiveTariff4TempD + '.' + PositiveActiveTariff4TempA + PositiveActiveTariff4TempB
    Checksum = FrameText[66:68].upper()
    Terminator = FrameText[68:70]
    data = { 'electric_DataIdentification':DataIdentification ,
             'Positive Active Total ' : PositiveActiveTotal ,
             'Positive Active - Tariff 1' :PositiveActiveTariff1 ,
             'Positive Active - Tariff 2' : PositiveActiveTariff2 ,
             'Positive Active - Tariff 3 '  : PositiveActiveTariff3 ,
             'Positive Active - Tariff 4 ' : PositiveActiveTariff4
            }
    data_json = json.dumps(data)
    print(data_json)

 # print ('Radarking DTS150 Three-Phase Electric Meter')
  # print ('Leading:',Leading)
  # print ('Frame Starter:',FrameStarter1)
  # print ('Address: ',Address)
  # print ('Frame Starter:',FrameStarter2)
  # print ('Control Code:',ControlCode)
  # print ('Length:',Length)
  # print ('Data Identification:',DataIdentification)
  # print ('Positive Active Total:',PositiveActiveTotal,'kWh')
  # print ('Positive Active - Tariff 1:',PositiveActiveTariff1,'kWh')
  # print ('Positive Active - Tariff 2:',PositiveActiveTariff2,'kWh')
  # print ('Positive Active - Tariff 3:',PositiveActiveTariff3,'kWh')
  # print ('Positive Active - Tariff 4:',PositiveActiveTariff4,'kWh')
  # print ('Checksum:',Checksum)
  # print ('Terminator:',Terminator)
if ControlCode == '91' and DataIdentificationString ==  '33323533' : ##DTS150
    DataIdentification = '0002FF00'
    ReverseActiveTotalString = FrameText[36:42]
    ReverseActiveTotalTempA = str(hex(int(ReverseActiveTotalString[0] ,16) - 0x3))[2]
    ReverseActiveTotalTempB = str(hex(int(ReverseActiveTotalString[1] ,16) - 0x3))[2]
    ReverseActiveTotalTempC = str(hex(int(ReverseActiveTotalString[2] ,16) - 0x3))[2]
    ReverseActiveTotalTempD = str(hex(int(ReverseActiveTotalString[3] ,16) - 0x3))[2]
    ReverseActiveTotalTempE = str(hex(int(ReverseActiveTotalString[4] ,16) - 0x3))[2]
    ReverseActiveTotalTempF = str(hex(int(ReverseActiveTotalString[5] ,16) - 0x3))[2]
    ReverseActiveTotal =  ReverseActiveTotalTempE + ReverseActiveTotalTempF + ReverseActiveTotalTempC + ReverseActiveTotalTempD + '.' + ReverseActiveTotalTempA + ReverseActiveTotalTempB
    ReverseActiveTariff1String = FrameText[42:48]
    ReverseActiveTariff1TempA = str(hex(int(ReverseActiveTariff1String[0] ,16) - 0x3))[2]
    ReverseActiveTariff1TempB = str(hex(int(ReverseActiveTariff1String[1] ,16) - 0x3))[2]
    ReverseActiveTariff1TempC = str(hex(int(ReverseActiveTariff1String[2] ,16) - 0x3))[2]
    ReverseActiveTariff1TempD = str(hex(int(ReverseActiveTariff1String[3] ,16) - 0x3))[2]
    ReverseActiveTariff1TempE = str(hex(int(ReverseActiveTariff1String[4] ,16) - 0x3))[2]
    ReverseActiveTariff1TempF = str(hex(int(ReverseActiveTariff1String[5] ,16) - 0x3))[2]
    ReverseActiveTariff1 =  ReverseActiveTariff1TempE + ReverseActiveTariff1TempF + ReverseActiveTariff1TempC + ReverseActiveTariff1TempD + '.' + ReverseActiveTariff1TempA + ReverseActiveTariff1TempB
    ReverseActiveTariff2String = FrameText[48:54]
    ReverseActiveTariff2TempA = str(hex(int(ReverseActiveTariff2String[0] ,16) - 0x3))[2]
    ReverseActiveTariff2TempB = str(hex(int(ReverseActiveTariff2String[1] ,16) - 0x3))[2]
    ReverseActiveTariff2TempC = str(hex(int(ReverseActiveTariff2String[2] ,16) - 0x3))[2]
    ReverseActiveTariff2TempD = str(hex(int(ReverseActiveTariff2String[3] ,16) - 0x3))[2]
    ReverseActiveTariff2TempE = str(hex(int(ReverseActiveTariff2String[4] ,16) - 0x3))[2]
    ReverseActiveTariff2TempF = str(hex(int(ReverseActiveTariff2String[5] ,16) - 0x3))[2]
    ReverseActiveTariff2 =  ReverseActiveTariff2TempE + ReverseActiveTariff2TempF + ReverseActiveTariff2TempC + ReverseActiveTariff2TempD + '.' + ReverseActiveTariff2TempA + ReverseActiveTariff2TempB
    ReverseActiveTariff3String = FrameText[54:60]
    ReverseActiveTariff3TempA = str(hex(int(ReverseActiveTariff3String[0] ,16) - 0x3))[2]
    ReverseActiveTariff3TempB = str(hex(int(ReverseActiveTariff3String[1] ,16) - 0x3))[2]
    ReverseActiveTariff3TempC = str(hex(int(ReverseActiveTariff3String[2] ,16) - 0x3))[2]
    ReverseActiveTariff3TempD = str(hex(int(ReverseActiveTariff3String[3] ,16) - 0x3))[2]
    ReverseActiveTariff3TempE = str(hex(int(ReverseActiveTariff3String[4] ,16) - 0x3))[2]
    ReverseActiveTariff3TempF = str(hex(int(ReverseActiveTariff3String[5] ,16) - 0x3))[2]
    ReverseActiveTariff3 =  ReverseActiveTariff3TempE + ReverseActiveTariff3TempF + ReverseActiveTariff3TempC + ReverseActiveTariff3TempD + '.' + ReverseActiveTariff3TempA + ReverseActiveTariff3TempB
    ReverseActiveTariff4String = FrameText[60:66]
    ReverseActiveTariff4TempA = str(hex(int(ReverseActiveTariff4String[0] ,16) - 0x3))[2]
    ReverseActiveTariff4TempB = str(hex(int(ReverseActiveTariff4String[1] ,16) - 0x3))[2]
    ReverseActiveTariff4TempC = str(hex(int(ReverseActiveTariff4String[2] ,16) - 0x3))[2]
    ReverseActiveTariff4TempD = str(hex(int(ReverseActiveTariff4String[3] ,16) - 0x3))[2]
    ReverseActiveTariff4TempE = str(hex(int(ReverseActiveTariff4String[4] ,16) - 0x3))[2]
    ReverseActiveTariff4TempF = str(hex(int(ReverseActiveTariff4String[5] ,16) - 0x3))[2]
    ReverseActiveTariff4 =  ReverseActiveTariff4TempE + ReverseActiveTariff4TempF + ReverseActiveTariff4TempC + ReverseActiveTariff4TempD + '.' + ReverseActiveTariff4TempA + ReverseActiveTariff4TempB
    Checksum = FrameText[66:68].upper()
    Terminator = FrameText[68:70]
    data = { 'electric_DataIdentification':DataIdentification ,
             'Reverse Active Total ' : ReverseActiveTotal ,
             'Reverse Active - Tariff 1' :ReverseActiveTariff1 ,
             'Reverse Active - Tariff 2' : ReverseActiveTariff2 ,
             'Reverse Active - Tariff 3 '  : ReverseActiveTariff3 ,
             'Reverse Active - Tariff 4 ' : ReverseActiveTariff4
            }
    data_json = json.dumps(data)
    print(data_json)
# print ('Radarking DTS150 Three-Phase Electric Meter')
  # print ('Leading:',Leading)
  # print ('Frame Starter:',FrameStarter1)
  # print ('Address: ',Address)
  # print ('Frame Starter:',FrameStarter2)
  # print ('Control Code:',ControlCode)
  # print ('Length:',Length)
  # print ('Data Identification:',DataIdentification)
  # print ('Reverse Active Total:',ReverseActiveTotal,'kWh')
  # print ('Reverse Active - Tariff 1:',ReverseActiveTariff1,'kWh')
  # print ('Reverse Active - Tariff 2:',ReverseActiveTariff2,'kWh')
  # print ('Reverse Active - Tariff 3:',ReverseActiveTariff3,'kWh')
  # print ('Reverse Active - Tariff 4:',ReverseActiveTariff4,'kWh')
  # print ('Checksum:',Checksum)
  # print ('Terminator:',Terminator)
if ControlCode == 'D1' and Length == '05' : ##DTS150
    ErrorCode = FrameText[36:38].upper()
    Checksum = FrameText[38:40].upper()
    Terminator = FrameText[40:42]
    data = { 'electric_DataIdentification':DataIdentification ,

            }
    data_json = json.dumps(data)
    print(data_json)
  # print ('Radarking DTS150 Three-Phase Electric Meter')
  # print ('Leading:',Leading)
  # print ('Frame Starter:',FrameStarter1)
  # print ('Address: ',Address)
  # print ('Frame Starter:',FrameStarter2)
  # print ('Control Code:',ControlCode)
  # print ('Length:',Length)
  # print ('Data Identification:',DataIdentificationString)
  # print ('Error Code: ', ErrorCode)
  # print ('Checksum:',Checksum)
  # print ('Terminator:',Terminator)
if ControlCode == '91' and Length == '0A' and DataIdentificationString == '33743333' : #G16YW
    DataIdentification =  '00004100'
    DataString = FrameText[36:44]
    DataStringTempA = str(hex(int(DataString[0] ,16) - 0x3))[2]
    DataStringTempB = str(hex(int(DataString[1] ,16) - 0x3))[2]
    DataStringTempC = str(hex(int(DataString[2] ,16) - 0x3))[2]
    DataStringTempD = str(hex(int(DataString[3] ,16) - 0x3))[2]
    DataStringTempE = str(hex(int(DataString[4] ,16) - 0x3))[2]
    DataStringTempF = str(hex(int(DataString[5] ,16) - 0x3))[2]
    DataStringTempG = str(hex(int(DataString[6] ,16) - 0x3))[2]
    DataStringTempH = str(hex(int(DataString[7] ,16) - 0x3))[2]
    Data =  DataStringTempG + DataStringTempH + DataStringTempE + DataStringTempF + DataStringTempC + DataStringTempD + '.' + DataStringTempA + DataStringTempB
    StatusWordString = FrameText[44:48]
    StatusWordStringTempA = str(hex(int(StatusWordString[0] ,16) - 0x3))[2]
    StatusWordStringTempB = str(hex(int(StatusWordString[1] ,16) - 0x3))[2]
    StatusWordStringTempC = str(hex(int(StatusWordString[2] ,16) - 0x3))[2]
    StatusWordStringTempD = str(hex(int(StatusWordString[3] ,16) - 0x3))[2]
    StatusWord =  StatusWordStringTempC + StatusWordStringTempD + StatusWordStringTempA + StatusWordStringTempB
    StatusWordBits = format (int(StatusWord,16) , '#032b')
    if StatusWordBits[-2:] == '01' : StatusWord = StatusWord + ' / Valve: Closed'
    if StatusWordBits[-2:] == '11' : StatusWord = StatusWord + ' / Valve: Abnormal'
    if StatusWordBits[-3] == '1' : StatusWord = StatusWord + ' / Voltage: Undervoltage'
    if StatusWordBits[-4] == '1' : StatusWord = StatusWord + ' / Alarm: Yes'
    if StatusWordBits[-4] == '1' : StatusWord = StatusWord + ' / Alarm: Yes'
    if StatusWordBits[-5] == '1' : StatusWord = StatusWord + ' / Overdraft: Yes'
    if StatusWordBits[-6] == '1' : StatusWord = StatusWord + ' / Magnetic Interference: Yes'
    if StatusWordBits[-7] == '1' : StatusWord = StatusWord + ' / Forced State: Yes'
    Checksum = FrameText[48:50].upper()
    Terminator = FrameText[50:52]
    data = {'Gas_DataIdentification':DataIdentification ,
             'Gas_data': Data ,
             'code' : 'gas123'
            }
    data_json = json.dumps(data)
    print(data_json)
 #   print ('Radarking G16YW Gas Meter')
  #  print ('Leading:',Leading)
 #   print ('Frame Starter:',FrameStarter1)
 #   print ('Address:',Address)
 #   print ('Frame Starter:',FrameStarter2)
 #   print ('Control Code:',ControlCode)
  #  print ('Length:',Length)
   # print ('Data Identification:',DataIdentification)
    #print ('Data:', Data, 'm3')
   # print ('Status Word:', StatusWord)
  # print ('Checksum:',Checksum)
  #  print ('Terminator:',Terminator)
##910c33753333
if ControlCode == '91' and Length == '0C' and DataIdentificationString == '33753333' : #LXZ
    DataIdentificationString = FrameText[28:36]
    DataIdentificationTempA = str(hex(int(DataIdentificationString[0] ,16) - 0x3))[2]
    DataIdentificationTempB = str(hex(int(DataIdentificationString[1] ,16) - 0x3))[2]
    DataIdentificationTempC = str(hex(int(DataIdentificationString[2] ,16) - 0x3))[2]
    DataIdentificationTempD = str(hex(int(DataIdentificationString[3] ,16) - 0x3))[2]
    DataIdentificationTempE = str(hex(int(DataIdentificationString[4] ,16) - 0x3))[2]
    DataIdentificationTempF = str(hex(int(DataIdentificationString[5] ,16) - 0x3))[2]
    DataIdentificationTempG = str(hex(int(DataIdentificationString[6] ,16) - 0x3))[2]
    DataIdentificationTempH = str(hex(int(DataIdentificationString[7] ,16) - 0x3))[2]
    DataIdentification =  DataIdentificationTempG + DataIdentificationTempH + DataIdentificationTempE + DataIdentificationTempF + DataIdentificationTempC + DataIdentificationTempD + DataIdentificationTempA + DataIdentificationTempB
    DataString = FrameText[36:44]
    DataTempA = str(hex(int(DataString[0] ,16) - 0x3))[2]
    DataTempB = str(hex(int(DataString[1] ,16) - 0x3))[2]
    DataTempC = str(hex(int(DataString[2] ,16) - 0x3))[2]
    DataTempD = str(hex(int(DataString[3] ,16) - 0x3))[2]
    DataTempE = str(hex(int(DataString[4] ,16) - 0x3))[2]
    DataTempF = str(hex(int(DataString[5] ,16) - 0x3))[2]
    DataTempG = str(hex(int(DataString[6] ,16) - 0x3))[2]
    DataTempH = str(hex(int(DataString[7] ,16) - 0x3))[2]
    Data =  DataTempG + DataTempH + DataTempE + DataTempF + DataTempC + DataTempD + '.' + DataTempA + DataTempB
    StatusWordString = FrameText[44:48]
    StatusWordTempA = str(hex(int(StatusWordString[0] ,16) - 0x3))[2]
    StatusWordTempB = str(hex(int(StatusWordString[1] ,16) - 0x3))[2]
    StatusWordTempC = str(hex(int(StatusWordString[2] ,16) - 0x3))[2]
    StatusWordTempD = str(hex(int(StatusWordString[3] ,16) - 0x3))[2]
    StatusWord =  StatusWordTempC + StatusWordTempD + StatusWordTempA + StatusWordTempB
    StatusWordBits = format (int(StatusWord,16) , '#032b')
    if StatusWordBits[-2:] == '01' : StatusWord = StatusWord + ' / Valve: Closed'
    if StatusWordBits[-2:] == '11' : StatusWord = StatusWord + ' / Valve: Abnormal'
    if StatusWordBits[-3] == '1' : StatusWord = StatusWord + ' / Voltage: Undervoltage'
    if StatusWordBits[-4] == '1' : StatusWord = StatusWord + ' / Alarm: Yes'
    if StatusWordBits[-4] == '1' : StatusWord = StatusWord + ' / Alarm: Yes'
    if StatusWordBits[-5] == '1' : StatusWord = StatusWord + ' / Overdraft: Yes'
    if StatusWordBits[-6] == '1' : StatusWord = StatusWord + ' / Magnetic Interference: Yes'
    if StatusWordBits[-7] == '1' : StatusWord = StatusWord + ' / Forced State: Yes'
    BatteryVoltageString = FrameText[48:50]
    BatteryVoltageTemp = int(hex(int(0xFF + int(BatteryVoltageString ,16) - 0x33 + 0x1)),16)
    BatteryVoltage =  round((BatteryVoltageTemp * 15.37),2)
    StatusByte = FrameText[50:52].upper()
    Checksum = FrameText[52:54].upper()
    Terminator = FrameText[54:56]
    data = {'Water_DataIdentification':DataIdentification ,
             'Water_data': Data ,
             'code' : 'water123'
            }
    data_json = json.dumps(data)
    print(data_json)
   # print ('Radarking LXZ Water Meter')
    #print ('Leading:',Leading)
    #print ('Frame Starter:',FrameStarter1)
    #print ('Address: ',Address)
   # print ('Frame Starter:',FrameStarter2)
   # print ('Control Code:',ControlCode)
   # print ('Length:',Length)
   # print ('Data Identification:',DataIdentification)
   # print ('Data:',Data,'m3')
   # print ('Status Word:',StatusWord)
#  print ('Status Byte:',StatusByte)
  #  print ('Checksum:',Checksum)
  #  print ('Terminator:',Terminator)
