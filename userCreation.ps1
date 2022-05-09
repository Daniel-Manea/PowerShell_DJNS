function New-DJUsers {
[CmdletBinding()]
param (
   # [Parameter(Mandatory)]
    #[string] $Path
)

try { 

    $response = Invoke-WebRequest -URI 'https://djns-dc35c-default-rtdb.europe-west1.firebasedatabase.app/users.json'
    $mockData = $response.Content | ConvertFrom-Json
    
    for ($i = 0; $i -lt $mockData.count; $i++) {  
        $vari = "" 

        $surnameLenght = $mockData[$i].Surname.Split("").length

        for ($a = 0; $a -lt $mockData[$i].Surname.Split("").length -1; $a++) {

         
            $surName = $mockData[$i].Surname.Split("")[$a][0];
            $vari = $($vari + $surName)   
              
        }

        $surName = $($vari +  $mockData[$i].Surname.Split("")[-1])
                   Write-Host $surName     
          
        $userName = '{0}{1}' -f $mockData[$i].GivenName.Substring(0, 1), $surName
        
            $j = 2
            while ((Get-ADUser -Filter "samAccountName -eq '$userName'") -and ($userName -notlike "$mockData[$i].GivenName")) {
            Write-Warning -Message "The username [$($userName)] is already in use. Trying another.."
            $userName = '{0}{1}' -f $mockData[$i].GivenName.substring(0, $j), $surName
            Start-sleep -seconds 1
            $j++
                
    }

    $passWord = $mockData[$i].AccountPassword
    $secPassWord = ConvertTo-SecureString -String $passWord -AsPlainText -Force

    $newUserParams = @{     
    Name                  = $userName  
    GivenName             = $mockData[$i].GivenName          
    Surname               = $mockData[$i].Surname
    AccountPassword       = $secPassWord    
    Enabled               = [boolean]$mockData[$i].Enabled
    Department            = $mockData[$i].Department
    Title                 = $mockData[$i].Title
    }

    New-ADUser @newUserParams

    Set-ADUser -Identity $userName -Replace @{subDepartment="director"}

    if (!$mockData[$i].SubDepartment) {
        Set-ADUser -Identity $userName -Replace @{subDepartment = $mockData[$i].Department}
    } else {
        Set-ADUser -Identity $userName -Replace @{subDepartment = $mockData[$i].SubDepartment}
    }


    Set-ADUser -Identity $userName -Replace @{section ="director"}

    if (!$mockData[$i].Section) {
        Set-ADUser -Identity $userName -Replace @{section = $mockData[$i].Department}
    } else {
        Set-ADUser -Identity $userName -Replace @{section = $mockData[$i].Section}
    }
    
    $department = $mockData[$i].Department

    $subDepartment = $mockData[$i].SubDepartment
    write-host $subDepartment

    $section = $mockData[$i].Section

    if (-not ($ou = Get-ADOrganizationalUnit -Filter "Name -eq '$department'")) {
        New-ADOrganizationalUnit -Name "$department" -ProtectedFromAccidentalDeletion $False
        Move-ADObject -Identity "CN = $userName, CN = Users, DC = DJNS, DC = local" -TargetPath "OU = $department, DC = DJNS, DC = local" 
    } else {
        Move-ADObject -Identity "CN = $userName, CN = Users, DC = DJNS, DC = local" -TargetPath "OU = $department, DC = DJNS, DC = local"
    }

   if (-not ($grp = Get-ADGroup -Filter "Name -eq '$department'")) {
        New-ADGroup -Name "$department" -GroupScope Global
        Add-ADGroupMember -Identity $department -Members $userName 
    } else {
        Add-ADGroupMember -Identity $department -Members $userName 
    }
      
    if (-not ($ou = Get-ADOrganizationalUnit -Filter "Name -eq '$subDepartment'")) {
        New-ADOrganizationalUnit -Name "$subDepartment" -ProtectedFromAccidentalDeletion $False
        Move-ADObject -Identity "CN = $userName, OU = $department, DC = DJNS, DC = local" -TargetPath "OU = $subDepartment, DC = DJNS, DC = local"
        Move-ADObject -Identity "OU = $subDepartment, DC = DJNS, DC = local" -TargetPath "OU = $department, DC = DJNS, DC = local" 
    } else {
       
        Try {
        Move-ADObject -Identity "CN = $userName, OU = $department, DC = DJNS, DC = local" -TargetPath "OU = $subDepartment, OU = $department, DC = DJNS, DC = local"
        Move-ADObject -Identity "OU = $subDepartment, DC = DJNS, DC = local" -TargetPath "OU = $department, DC = DJNS, DC = local"
        }
        Catch{}
    }
  
    if (-not ($grp = Get-ADGroup -Filter "Name -eq '$subDepartment'")) {
        New-ADGroup -Name "$subDepartment" -GroupScope Global
        Add-ADGroupMember -Identity $subDepartment -Members $userName 
    } else {
        Add-ADGroupMember -Identity $subDepartment -Members $userName 
    }
    
    if (-not ($ou = Get-ADOrganizationalUnit -Filter "Name -eq '$section'")) {
        New-ADOrganizationalUnit -Name "$section" -ProtectedFromAccidentalDeletion $False
        Move-ADObject -Identity "CN = $userName, OU = $subDepartment, OU = $department, DC = DJNS, DC = local" -TargetPath "OU = $section, DC = DJNS, DC = local"
        Try{
        Move-ADObject -Identity "OU = $section, DC = DJNS, DC = local" -TargetPath "OU = $subDepartment, OU = $department, DC = DJNS, DC = local"
        }
        Catch{}
    } else {
        Try {
        Move-ADObject -Identity "CN = $userName, OU = $subDepartment, OU = $department, DC = DJNS, DC = local" -TargetPath "OU = $section, OU = $subDepartment, OU = $department, DC = DJNS, DC = local"
        Move-ADObject -Identity "OU = $section, DC = DJNS, DC = local" -TargetPath "OU = $subDepartment, OU = $department, DC = DJNS, DC = local" 
        }
        Catch{}
    }

    if (-not ($grp = Get-ADGroup -Filter "Name -eq '$section'")) {
        New-ADGroup -Name "$section" -GroupScope Global
        Add-ADGroupMember -Identity $section -Members $userName 
    } else {
        Add-ADGroupMember -Identity $section -Members $userName 
   }
  
    }
    
} catch {
    Write-Error -Message $_.Exception.Message -Verbose
}
} New-DJUsers